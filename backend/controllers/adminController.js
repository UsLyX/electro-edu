const prisma = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");

class adminController {
  async create(req, res) {
    try {
      const { name, email, password } = req.body;

      const hash = await bcrypt.hash(password, 6);

      const newAdmin = await prisma.admin.create({
        data: {
          name,
          email,
          password: hash,
        },
      });
      return res
        .status(201)
        .json({ message: "Администратор создан", newAdmin });
    } 
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: `Ошибка сервера ${error}` });
    }
  }

  async getStatements(req, res) {
    try {
      const statementsStudent = await prisma.student.findMany();
      const statementsTeacher = await prisma.teacher.findMany();
      const teachPredmets = await prisma.teacherLesson.findMany({
        where: {
          teacherID: { in: statementsTeacher.map((item) => item.id) },
        },
      });
      statementsStudent.map((item) => (item.role = "Ученик"));
      statementsTeacher.map((item) => (item.role = "Учитель"));
      const statements = statementsStudent.concat(statementsTeacher);
      return res.status(200).json({ statements, teachPredmets });
    } 
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: `Ошибка сервера ${error}` });
    }
  }

  async changeStatement(req, res) {
    try {
      const { id, status, role } = req.body;

      if (role === "Ученик") {
        const student = await prisma.student.update({
          where: {
            id,
          },
          data: {
            status: status === "Принять" ? "ACCEPTED" : "REJECTED",
          },
        });
        return res.status(200).json({ message: "Заявка обработана", student, role });
      } 
      else if (role === "Учитель") {
        const teacher = await prisma.teacher.update({
            where: {
              id,
            },
            data: {
              status: status === "Принять" ? "ACCEPTED" : "REJECTED",
            },
          });
          return res.status(200).json({ message: "Заявка обработана", teacher, role });
      }
    } 
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: `Ошибка сервера ${error}` });
    }
  }
}

module.exports = new adminController();
