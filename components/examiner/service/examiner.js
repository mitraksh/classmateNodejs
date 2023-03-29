const Examiner = require('../../../view/examiner')
const db = require('../../../models')
const {BadRequest} = require("../../../errors")

const loginService = async (email,password) => {
    const transaction = await db.sequelize.transaction()
    try {
      const checkExaminerLogin = await Examiner.examinerLogin(email,password)
      return checkExaminerLogin
    } catch (error) {
      console.error(error)
      throw new BadRequest(error)
    }
  }

const createExaminerService = async (examiner) => {
    const transaction = await db.sequelize.transaction()
    try {
        await Examiner.uniqueValues(examiner.email,examiner.subject)
        await Examiner.checkSubject(examiner.subject)
        const postExaminer = await examiner.createExaminer(transaction)
        await transaction.commit()
        return postExaminer
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

const getAllExaminerService = async () => {
    try {
        const getAllExaminer = await Examiner.getAllExaminers()
        return getAllExaminer
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

const getAllExaminerByIDService = async (examinerID) => {
    try {
        const getAllExaminerByID = await Examiner.getExaminersByID(examinerID)
        return getAllExaminerByID
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

const updateExaminerService = async (examinerDetails,examinerID) => {
    const transaction = await db.sequelize.transaction()
    try {
        // console.log('updateExaminerService111111111111111111111111111111')
        // await Examiner.uniqueValues(examiner.email,examiner.subjectID) 
        await Examiner.checkSubject(examinerDetails.subjectId)
        const updateExaminer = await Examiner.updateExaminer(transaction,examinerDetails,examinerID)
        await transaction.commit()
        return updateExaminer
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

const deleteExaminerService = async (examinerID) => {
    const transaction = await db.sequelize.transaction()
    try {
        const deleteExaminer = await Examiner.deleteExaminer(transaction,examinerID)
        await transaction.commit()
        return deleteExaminer
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

module.exports = {
    loginService,
    createExaminerService,
    getAllExaminerService,
    getAllExaminerByIDService,
    updateExaminerService,
    deleteExaminerService
}