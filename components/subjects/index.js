const express = require('express')
const {
    createSubject,
    getAllSubjects,
    getSubjectByID,
    updateSubject,
    deleteSubject,
    assignSubject
   } = require('./controller/subjects')
const subjectValidator = require('../../middleware/validator')
const JwtToken = require('../../middleware/jwt')
const subjectRouter = express.Router()

subjectRouter.post('/',[JwtToken.verify,subjectValidator.validateSubject],createSubject)
subjectRouter.post('/assign/:studentID', [JwtToken.verify], assignSubject)
subjectRouter.get('/',JwtToken.verify,getAllSubjects)
subjectRouter.get('/:subjectID', JwtToken.verify, getSubjectByID)
subjectRouter.patch('/:subjectID', [JwtToken.verify], updateSubject)
subjectRouter.put('/:subjectID', [JwtToken.verify], updateSubject)
subjectRouter.delete('/:subjectID', [JwtToken.verify], deleteSubject)

module.exports = subjectRouter