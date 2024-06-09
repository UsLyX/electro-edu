const prisma = require('../prisma/prisma-client')
const bcrypt = require('bcrypt')

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
            if(role === 'Ученик') {
                const candidate = await prisma.student.findFirst({
                    where: { email }
                })
                if(candidate){
                    return res.status(400).json({message: 'Ученик с таким почтовым ящиком уже существует'})
                } 

                const hash = await bcrypt.hash(password, 6)

                const newStudent = await prisma.student.create({
                    data: {
                        lastName,
                        firstName,
                        email,
                        password: hash,
                        class: {create: {className: studClass}}
                    }
                })
                console.log(newStudent)
                return res.status(201).json({ message: "Регистрация прошла успешно", newStudent });
            }
            else if(role === 'Учитель') {
                const candidate = await prisma.teacher.findFirst({
                    where: { email }
                })
                if(candidate){
                    return res.status(400).json({message: 'Учитель с таким почтовым ящиком уже существует'})
                } 

                const hash = await bcrypt.hash(password, 6)

                const newTeacher = await prisma.student.create({
                    data: {
                        lastName,
                        firstName,
                        email,
                        password: hash,
                        //predmets: teachPredmets
                    }
                })
                return res.status(201).json({ message: "Регистрация прошла успешно", newTeacher });
            }
            console.log('user created')
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: `Ошибка сервера ${error}`})
        }
    }
}

module.exports = new userController();