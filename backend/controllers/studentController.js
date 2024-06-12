const prisma = require("../prisma/prisma-client");


class studentController {
    async students(req, res) {
        try {
            const { studentClass } = req.body;
            const students = await prisma.student.findMany({
                where: {
                    classId: studentClass
                }
            })
            return res.status(200).json(students)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: `Ошибка сервера ${error}`}) 
        }
    }

    async getTeachers(req, res) {
        try {
            const teachers = await prisma.teacher.findMany({
                where: {
                    status: 'ACCEPTED'
                },
                include: {
                    predmets: true
                }
            })
            return res.status(200).json(teachers)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: `Ошибка сервера ${error}`}) 
        }
    }

    async predmets(req, res) {
        try {
            const { classId } = req.body
            const predmets = await prisma.class.findUnique({
                where: {
                    id: classId
                },
                include: {
                    ClassLessons: true
                }
            })
            return res.status(200).json(predmets)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: `Ошибка сервера ${error}`}) 
        }
    }
}

module.exports = new studentController();