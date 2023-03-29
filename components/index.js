const express = require('express')
const router = express.Router()
const examinerRouter = require('./examiner')
const studentRouter = require('./students')
const subjectRouter = require('./subjects')
const scoreRouter = require('./score')
router.use('/examiner', examinerRouter)
router.use('/student', studentRouter)
router.use('/subject', subjectRouter)
router.use('/score', scoreRouter)

module.exports = router