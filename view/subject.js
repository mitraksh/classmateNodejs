const { Op } = require('sequelize')
const db = require('../models/index')
const {BadRequest, UnauthoirzedError} = require("../errors")

class Subject{
    constructor(moduleId,name){
        this.moduleId = moduleId
        this.name = name
        }

        setSubjectID (id) {
            this.id = id
        }

        createPayload () {
            return {
                moduleId: this.moduleId,
                name: this.name,
            }
        }

        static async uniqueValues(moduleId){
            try {
                const uniqueModuleID = await db.subject.findOne({
                    where:{
                        module_id: moduleId
                    },
                })
                if(uniqueModuleID){
                    throw new BadRequest('This module id already exists, please try again')
                }
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async checkSubject(subjectID){
            try {
                const uniqueModuleID = await db.subject.findOne({
                    where:{
                        id: subjectID
                    },
                })
                if(!uniqueModuleID){
                    throw new BadRequest('No Subject found with id: '+subjectID)
                }
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        async createSubject(transaction){
            try {
                const createSubject = await db.subject.create(this.createPayload(),{
                    transaction: transaction
                })
                return createSubject
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async getAllSubjects(){
            try {
                const getAllSubject = await db.subject.findAll()
                if(!getAllSubject){
                    throw new BadRequest('No Subject found.')
                }
                return getAllSubject
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async getSubjectByID(subjectID){
            try {
                const getSubjectByID = await db.subject.findOne({
                    where: {
                        id: subjectID
                    }
                })
                if(!getSubjectByID){
                    throw new BadRequest('No Subject found by id: '+subjectID)
                }
                return getSubjectByID
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async updateSubject(transaction,subjectDetails,subjectID){
            try {
                const updateSubject = await db.subject.update(subjectDetails,{
                    where: {
                        id: subjectID
                    },
                    transaction: transaction
                })
                if(updateSubject == 0){
                    throw new BadRequest('Subject not updated, please try again')
                }
                return updateSubject
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async deleteSubject(transaction,subjectID){
            try {
                const deleteSubject = await db.subject.destroy({
                    where: {
                        id: subjectID
                    },
                    transaction: transaction
                })
                if(deleteSubject == 0){
                    throw new BadRequest('Subject not deleted, please try again')
                }
                return deleteSubject
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }
}

module.exports = Subject