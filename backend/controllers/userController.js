const prisma = require('../prisma/prisma-client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "24h"} )
}


class userController{
    async info(req, res) {
        try {
            const user = await prisma.user.findMany()
            console.log('user')
            return res.status(200).json(user)
        } catch (error) {
            console.log(error)
        }
    }
    async create(req, res) {
        try {
            const {role, email, lastName, firstName, studClass, teachPredmets, password} = req.body;

            const studentCandidate = await prisma.student.findFirst({
                where: { email }
            })
            const teactherCandidate = await prisma.teacher.findFirst({
                where: { email }
            })
            const adminCandidate = await prisma.admin.findFirst({
                where: { email }
            })
            if(studentCandidate || teactherCandidate || adminCandidate){
                console.log("Пользователь с таким почтовым ящиком уже существует")
                return res.status(400).json({message: 'Пользователь с таким почтовым ящиком уже существует'})
            } 

            if(role === 'Ученик') {
                const hash = await bcrypt.hash(password, 6)

                const newStudent = await prisma.student.create({
                    data: {
                        lastName,
                        firstName,
                        email,
                        password: hash,
                        class: { connect: { className: studClass } }
                    }
                })
                return res.status(202).json({ message: "Заявка на регистрацию принята", newStudent});
            }
            else if(role === 'Учитель') {
                const hash = await bcrypt.hash(password, 6)

                const newTeacher = await prisma.teacher.create({
                    data: {
                        lastName,
                        firstName,
                        email,
                        password: hash,
                        predmets: { create: teachPredmets.map(item => ({lessonName: item}))}
                    }
                })
                console.log(newTeacher)
                return res.status(202).json({ message: "Заявка на регистрацию принята", newTeacher });
            }
            console.log('user created')
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: `Ошибка сервера ${error}`})
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body

            const studentCandidate = await prisma.student.findFirst({
                where: { email }
            })
            const teactherCandidate = await prisma.teacher.findFirst({
                where: { email }
            })
            const adminCandidate = await prisma.admin.findFirst({
                where: { email }
            })

            if(studentCandidate){
                if(studentCandidate.status === 'PROCESSING'){
                    return res.status(403).json({message: 'Заявка пока не обработана'})
                }
                else if(studentCandidate.status === 'REJECTED'){
                    return res.status(423).json({message: 'Заявка на регистрацию отклонена'})
                }
                const validPassword = bcrypt.compareSync(password, studentCandidate.password)
                if (!validPassword) {
                    return res.status(400).json({message: `Введен неверный пароль`})
                }
                const token = generateAccessToken(studentCandidate.id)
                return res.status(200).json({token, role: 'Ученик', message: 'Авторизация прошла успешно'})
            }
            else if(teactherCandidate){
                if(teactherCandidate.status === 'PROCESSING'){
                    return res.status(403).json({message: 'Заявка пока не обработана'})
                }
                else if(teactherCandidate.status === 'REJECTED'){
                    return res.status(423).json({message: 'Заявка на регистрацию отклонена'})
                }
                const validPassword = bcrypt.compareSync(password, teactherCandidate.password)
                if (!validPassword) {
                    return res.status(400).json({message: `Введен неверный пароль`})
                }
                const token = generateAccessToken(teactherCandidate.id)
                return res.status(200).json({token, role: 'Учитель', message: 'Авторизация прошла успешно'})
            }
            else if(adminCandidate){
                const validPassword = bcrypt.compareSync(password, adminCandidate.password)
                if (!validPassword) {
                    return res.status(400).json({message: `Введен неверный пароль`})
                }
                const token = generateAccessToken(adminCandidate.id)
                return res.status(200).json({token, role: 'Администратор', message: 'Авторизация прошла успешно'})
            }
            else {
                return res.status(400).json({message: `Пользователь не найден`})
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: `Ошибка сервера ${error}`}) 
        }
    }
}

module.exports = new userController();