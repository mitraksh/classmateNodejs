const express = require('express')
const {createExaminer,
    getAllExaminer,
    getAllExaminerByID,
    updateExaminer,
    deleteExaminer,
    verifyLogin} = require('./controller/examiner')
const examinerValidator = require('../../middleware/validator')
const examinerRouter = express.Router()
const JwtToken = require('../../middleware/jwt')

examinerRouter.post('/',[JwtToken.verify,examinerValidator.validateExaminer],createExaminer)
examinerRouter.post('/login',examinerValidator.validateLogin, verifyLogin)
examinerRouter.get('/',JwtToken.verify,getAllExaminer)
examinerRouter.get('/:examinerID', JwtToken.verify, getAllExaminerByID)
examinerRouter.patch('/:examinerID', [JwtToken.verify], updateExaminer)
examinerRouter.put('/:examinerID', [JwtToken.verify], updateExaminer)
examinerRouter.delete('/:examinerID', [JwtToken.verify], deleteExaminer)
module.exports = examinerRouter