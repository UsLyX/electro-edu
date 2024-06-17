const prisma = require("../prisma/prisma-client");


class teacherController {

    async getQuestion(req, res) {
        try {
            const { id } = req.params;
            const questions = await prisma.classLessons.findUnique({
                where: { id: Number(id) },
                include: {
                    questions: {
                        include: {
                          answers: {
                            include: {
                                student: true
                            }
                          }  
                        },
                        orderBy: {
                            id: 'desc'
                        }
                    }
                },
            })
            return res.status(200).json(questions)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: `Ошибка сервера ${error}`})
        }
    }

    async addQuestion(req, res) {
        try {
            const { id, description, files } = req.body;

            const addQuestion = await prisma.classLessons.update({
                where: {id},
                data: {
                    questions: {
                        create: {
                            questionDescription: description,
                            files: files.map(file => file)
                        }
                    }
                },
                include: {
                    questions: true
                }
            })
            return res.status(201).json({message: 'Задание успешно добавлено', addQuestion})
        } 
        catch (error) {
            console.log(error)
            return res.status(500).json({message: `Ошибка сервера ${error}`})
        }
    }

    async updateScore(req, res) {
        try {
            const { studentId, questionId, score } = req.body
            let studentScore = '';
            switch (score) {
                case 'Отлично':
                    studentScore = 'PERFECT'
                    break;
        
                case 'Хорошо':
                    studentScore = 'GOOD'
                    break;
        
                case 'Удовлетворительно':
                    studentScore = 'SATISFACTORY'
                    break;
        
                case 'Плохо':
                    studentScore = 'BAD'
                    break;
            }
            const answerUpdate = await prisma.answer.updateMany({
                where: { questionId: questionId, studentId: studentId },
                data: {
                    score: studentScore
                }
            })
            return res.status(200).json({message: 'Оценка успешно поставлена', answerUpdate})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: `Ошибка сервера ${error}`})
        }
    }

}

module.exports = new teacherController();