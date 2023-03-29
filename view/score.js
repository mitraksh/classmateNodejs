const { Op } = require('sequelize')
const db = require('../models/index')
const {BadRequest, UnauthoirzedError} = require("../errors")

class Score{
    constructor(studentId,subjectId,score,outOf,percent,grade,examinedBy){
        this.studentId = studentId
        this.subjectId = subjectId
        this.score = score
        this.outOf = outOf
        this.percent = percent
        this.grade = grade
        this.examinedBy = examinedBy
        // this.examId = examId
        }

        setSubjectID (id) {
            this.id = id
        }

        createPayload () {
            return {
                studentId: this.studentId,
                subjectId: this.subjectId,
                score: this.score,
                outOf: this.outOf,
                percent: this.percent,
                grade: this.grade,
                examinedBy: this.examinedBy,
                examId: this.examId,
            }
        }

        static async uniqueValues(studentId,subjectID){
            try {
                const uniqueModuleID = await db.score.findOne({
                    where:{
                        student_id: studentId,
                        subject_id: subjectID
                    },
                })
                if(uniqueModuleID){
                    throw new BadRequest('This subject is already assigned to the student, please try again')
                }
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async checkScoreCard(studentId,subjectID){
            try {
                const checkScoreCard = await db.score.findOne({
                    where:{
                        student_id: studentId,
                        subject_id: subjectID
                    },
                })
                if(!checkScoreCard){
                    throw new BadRequest('Score card does not exist.')
                }
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async doNotUpdateScoreCard(scores){
            try {
                const checkScoreCard = await db.score.findOne({
                    where:{
                        student_id: scores.student_id,
                        subject_id: scores.subject_id,
                        score: {[Op.not]: null}
                    },
                })
                if(checkScoreCard){
                    throw new BadRequest('Scores cannot be changed once given.')
                }
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        async createScoreCard(transaction){
            try {
                const createScoreCard = await db.score.create(this.createPayload(),{
                    transaction: transaction
                })
                return createScoreCard
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async giveScore(transaction,scores){
            try {
                const giveScores = await db.score.update(scores,{
                    where:{
                        student_id: scores.student_id,
                        subject_id: scores.subject_id
                    },
                    transaction: transaction
                })
                if(giveScores == 0){
                    throw new BadRequest('Score not given. Something went wrong!. Please try again.')
                }
                return giveScores
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async getAllScoreCards(){
            try {
                const getAllScoreCards = await db.score.findAll()
                if(!getAllScoreCards){
                    throw new BadRequest('No Score Cards found.')
                }
                return getAllSubject
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async getScoreByID(scoreID){
            try {
                const getScoreByID = await db.score.findOne({
                    where: {
                        id: scoreID
                    }
                })
                if(!getScoreByID){
                    throw new BadRequest('No Score Card found by id: '+scoreID)
                }
                return getScoreByID
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async getScoreByStudentID(studentID,examinedBy){
            try {
                const getScoreByStudentID = await db.score.findAll({
                    where: {
                        student_id: parseInt(studentID),
                        examined_by: examinedBy,
                        score: {[Op.not]: null}
                    },
                    attributes: [
                        'studentId',
                        'subjectId',
                        'score',
                        'outOf',
                        'percent',
                        'grade'
                    ]
                })
                if(getScoreByStudentID == 0){
                    throw new BadRequest('No Score Card found by id: '+studentID)
                }
                return getScoreByStudentID
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async getScoreBySubjectID(subjectID){
            try {
                const getScoreBySubjectID = await db.score.findAll({
                    where: {
                        subject_id: subjectID
                    }
                })
                if(!getScoreBySubjectID){
                    throw new BadRequest('No Score Card found by id: '+subjectID)
                }
                return getScoreBySubjectID
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async getScoreByExaminerID(examinerID){
            try {
                const getScoreByExaminerID = await db.score.findAll({
                    where: {
                        examined_by: examinerID
                    }
                })
                if(getScoreByExaminerID == 0){
                    throw new BadRequest('No Score Card found by id: '+examinerID)
                }
                return getScoreByExaminerID
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }
}

module.exports = Score
