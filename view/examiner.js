const { Op } = require('sequelize')
const db = require('../models/index')
const {BadRequest, UnauthoirzedError} = require("../errors")

class Examiner{
    constructor(firstName, lastName, email, password, subject){
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.subject = subject
        }

        setExaminerID (id) {
            this.id = id
        }

        createPayload () {
            return {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                subjectModuleId: this.subject,
                isAdmin: false
            }
        }

        static async uniqueValues(email,subject){
            try {
                const uniqueEmail = await db.examiner.findOne({
                    where:{
                        email: email
                    },
                })
                if(uniqueEmail){
                    throw new BadRequest('This email already exists, please try again')

                }
                const uniqueSubject = await db.examiner.findOne({
                    where:{
                        subject_module_id: subject
                    },
                })
                if(uniqueSubject){
                    throw new BadRequest('This subject module is allocated to other examiner, please try again')

                }
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async checkSubject(subjectId){
            try {
                const checkSubject = await db.subject.findOne({
                    where:{
                        module_id: subjectId
                    }
                })
                console.log('checkSubject',checkSubject)
                if(!checkSubject){
                throw new BadRequest('Subject not found.')
                }
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        async createExaminer(transaction){
            try {
                const examiner = await db.examiner.create(this.createPayload(),{
                    transaction: transaction
                })
                return examiner
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async getAllExaminers(){
            try {
                const getAllExaminer = await db.examiner.findAll()
                if(!getAllExaminer){
                    throw new BadRequest('No Examiners found.')
                }
                return getAllExaminer
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async getExaminersByID(examinerID){
            try {
                const getExaminersByID = await db.examiner.findOne({
                    where: {
                        id: examinerID
                    }
                })
                if(!getExaminersByID){
                    throw new BadRequest('No Examiner found by id: '+examinerID)
                }
                return getExaminersByID
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async examinerLogin(email,password){
            try {
                const examinerLogin = await db.examiner.findOne({
                    where: {
                        email: email,
                        password: password
                    }
                })
                if(!examinerLogin){
                    throw new UnauthoirzedError('Examiner not found.')
                }
                return examinerLogin
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async updateExaminer(transaction,examinerDetails,examinerID){
            try {
                console.log('examiner in view',examinerDetails);
                const updatexaminer = await db.examiner.update(examinerDetails,{
                    where: {
                        id: examinerID
                    },
                    transaction: transaction
                })
                if(updatexaminer == 0){
                    throw new BadRequest('Examiner not updated, please try again')
                }
                return updatexaminer
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async deleteExaminer(transaction,examinerID){
            try {
                const deleteExaminer = await db.examiner.destroy({
                    where: {
                        id: examinerID
                    },
                    transaction: transaction
                })
                if(deleteExaminer == 0){
                    throw new BadRequest('Examiner not deleted, please try again')
                }
                return deleteExaminer
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }
}

module.exports = Examiner