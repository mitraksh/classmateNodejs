const Examiner = require('../../../view/examiner')
const db = require('../../../models')
const {BadRequest} = require("../../../errors")
const Score = require('../../../view/score')
const { BAD_REQUEST } = require('http-status-codes')

const loginService = async (email,password) => {
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

const giveScoresService = async (score,studentID,subjectID,examinerID,percent,grade) => {
    const transaction = await db.sequelize.transaction()
    try {
        // console.log('score',score);
        score["student_id"] = parseInt(studentID)
        score["subject_id"] = subjectID
        score["examined_by"] = examinerID
        score["percent"] = percent
        score["grade"] = grade
        console.log('score',score);
        await Score.doNotUpdateScoreCard(score)
        await Score.checkScoreCard(studentID,subjectID)
        const giveScores = await Score.giveScore(transaction,score)
        await transaction.commit()
        return giveScores
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

const getStudentScoresService = async (studentID,examinedBy) => {
    try {
        // console.log('studentID',typeof parseInt(studentID));
        // console.log('examinedBy',typeof examinedBy);
        const verifyExaminer = await Examiner.getExaminersByID(examinedBy)
        verifyExaminer.subject
        const getStudentScores = await Score.getScoreByStudentID(studentID,examinedBy)
        return getStudentScores
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

const getExaminerScoreCardService = async (examiner) => {
    try {
        // console.log('studentID',typeof parseInt(studentID));
        // console.log('examinedBy',typeof examinedBy);
        // const verifyExaminer = await Examiner.getExaminersByID(examinedBy)
        // if(verifyExaminer.subject == subjectId){
        //     throw new BadRequest('')
        // } 
        const getStudentScores = await Score.getScoreByExaminerID(examiner)
        return getStudentScores
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
    deleteExaminerService,
    giveScoresService,
    getStudentScoresService,
    getExaminerScoreCardService
}