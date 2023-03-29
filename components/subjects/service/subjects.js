const Subject = require('../../../view/subject')
const Score = require('../../../view/score')
const db = require('../../../models')
const {BadRequest} = require("../../../errors")

const createSubjectService = async (subject) => {
    const transaction = await db.sequelize.transaction()
    try {
        await Subject.uniqueValues(subject.moduleId)
        // await Subject.checkSubject(subject.subjectID)
        const postSubject = await subject.createSubject(transaction)
        await transaction.commit()
        return postSubject
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

const getAllSubjectsService = async () => {
    try {
        const getAllSubject = await Subject.getAllSubjects()
        return getAllSubject
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

const getSubjectByIDService = async (subjectID) => {
    try {
        const getAllSubjectByID = await Subject.getSubjectByID(subjectID)
        return getAllSubjectByID
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

const updateSubjectService = async (subjectDetails,subjectID) => {
    const transaction = await db.sequelize.transaction()
    try {
        // await Subject.checkSubject(subjectDetails.subjectId)
        const updateSubject = await Subject.updateSubject(transaction,subjectDetails,subjectID)
        await transaction.commit()
        return updateSubject
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

const deleteSubjectService = async (subjectID) => {
    const transaction = await db.sequelize.transaction()
    try {
        const deleteSubject = await Subject.deleteSubject(transaction,subjectID)
        await transaction.commit()
        return deleteSubject
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

const assignSubjectService = async (score) => {
    const transaction = await db.sequelize.transaction()
    try {
        console.log('score',score);

        await Score.uniqueValues(score.studentId,score.subjectId)
        await Subject.checkSubject(score.subjectId)
        const assignSubject = await score.createScoreCard(transaction)
        await transaction.commit()
        return assignSubject
    } catch (error) {
        console.error(error)
        throw new BadRequest(error)
    }
}

module.exports = {
    createSubjectService,
    getAllSubjectsService,
    getSubjectByIDService,
    updateSubjectService,
    deleteSubjectService,
    assignSubjectService
}