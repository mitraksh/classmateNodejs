const { Op } = require('sequelize')
const db = require('../models/index')
const {BadRequest, UnauthoirzedError} = require("../errors")

class Student{
    constructor(firstName, lastName, email, password, standard){
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.standard = standard
        }

        setStudentID (id) {
            this.id = id
        }

        createPayload () {
            return {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                standard: this.standard,
            }
        }
        static async studentLogin(email,password){
            try {
                const studentLogin = await db.student.findOne({
                    where: {
                        email: email,
                        password: password
                    }
                })
                if(!studentLogin){
                    throw new UnauthoirzedError('Student not found.')
                }
                return studentLogin
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async uniqueValues(email){
            try {
                const uniqueEmail = await db.student.findOne({
                    where:{
                        email: email
                    },
                })
                if(uniqueEmail){
                    throw new BadRequest('This email already exists, please try again')
                }
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        async createStudent(transaction){
            try {
                const student = await db.student.create(this.createPayload(),{
                    transaction: transaction
                })
                return student
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async getAllStudents(){
            try {
                const getAllStudent = await db.student.findAll()
                if(!getAllStudent){
                    throw new BadRequest('No Students found.')
                }
                return getAllStudent
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async getStudentByID(studentID){
            try {
                const getStudentsByID = await db.student.findOne({
                    where: {
                        id: studentID
                    }
                })
                if(!getStudentsByID){
                    throw new BadRequest('No Student found by id: '+studentID)
                }
                return getStudentsByID
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async updateStudent(transaction,studentDetails,studentID){
            try {
                const updatestudent = await db.student.update(studentDetails,{
                    where: {
                        id: studentID
                    },
                    transaction: transaction
                })
                if(updatestudent == 0){
                    throw new BadRequest('Student not updated, please try again')
                }
                return updatestudent
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }

        static async deleteStudent(transaction,studentID){
            try {
                const deleteStudent = await db.student.destroy({
                    where: {
                        id: studentID
                    },
                    transaction: transaction
                })
                if(deleteStudent == 0){
                    throw new BadRequest('Student not deleted, please try again')
                }
                return deleteStudent
            } catch (error) {
                console.error(error)
                throw new BadRequest(error)
            }
        }
}

module.exports = Student