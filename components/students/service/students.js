const Student = require('../../../view/student')
const db = require('../../../models')
const {BadRequest} = require("../../../errors")

const loginService = async (email,password) => {
    try {
      const checkStudentLogin = await Student.studentLogin(email,password)
      return checkStudentLogin
    } catch (error) {
      console.error(error)
      throw new BadRequest(error)
    }
  }

const createStudentService = async (student) => {
    const transaction = await db.sequelize.transaction()
    try {
        // await Student.uniqueValues(student.email,student.subjectID)
        // await Student.checkSubject(student.subjectID)
        const postStudent = await student.createStudent(transaction)
        await transaction.commit()
        return postStudent
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

const getAllStudentsService = async () => {
    try {
        const getAllStudent = await Student.getAllStudents()
        return getAllStudent
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

const getStudentByIDService = async (studentID) => {
    try {
        const getAllStudentByID = await Student.getStudentByID(studentID)
        return getAllStudentByID
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

const updateStudentService = async (studentDetails,studentID) => {
    const transaction = await db.sequelize.transaction()
    try {
        await Student.checkSubject(studentDetails.subjectId)
        const updateStudent = await Student.updateStudent(transaction,studentDetails,studentID)
        await transaction.commit()
        return updateStudent
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

const deleteStudentService = async (studentID) => {
    const transaction = await db.sequelize.transaction()
    try {
        const deleteStudent = await Student.deleteStudent(transaction,studentID)
        await transaction.commit()
        return deleteStudent
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

module.exports = {
    loginService,
    createStudentService,
    getAllStudentsService,
    getStudentByIDService,
    updateStudentService,
    deleteStudentService
}