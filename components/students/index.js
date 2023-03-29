const express = require('express')
const { verifyStudentLogin,
    createStudent,
    getAllStudents,
    getStudentByID,
    updateStudent,
    deleteStudent} = require('./controller/students')
const studentValidator = require('../../middleware/validator')
const JwtToken = require('../../middleware/jwt')
const studentRouter = express.Router()

studentRouter.post('/',[JwtToken.verify,studentValidator.validateStudent],createStudent)
studentRouter.post('/login',studentValidator.validateLogin, verifyStudentLogin)
studentRouter.get('/',JwtToken.verify,getAllStudents)
studentRouter.get('/:studentID', JwtToken.verify, getStudentByID)
studentRouter.patch('/:studentID', [JwtToken.verify], updateStudent)
studentRouter.put('/:studentID', [JwtToken.verify], updateStudent)
studentRouter.delete('/:studentID', [JwtToken.verify], deleteStudent)


module.exports = studentRouter