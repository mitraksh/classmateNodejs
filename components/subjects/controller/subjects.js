const { createSubjectService,
    getAllSubjectsService,
    getSubjectByIDService,
    updateSubjectService,
    deleteSubjectService,
    assignSubjectService
    } = require('../service/subjects')
const Subject = require('../../../view/subject')
const Score = require('../../../view/score')
const { StatusCodes } = require('http-status-codes')

const createSubject = async (req,res,next) => {
    try {
      const isAdmin = req.locals.user.isAdmin
      if(isAdmin == true){
        const {moduleId,name} = req.body
        const postSubjectObj = new Subject(moduleId,name)
        const postSubject = await createSubjectService(postSubjectObj)
        res.status(StatusCodes.OK).json(postSubject);
        return postSubject
      }else{
        res.status(StatusCodes.FORBIDDEN).send('Only admin can create a subject ❌')
      }
     
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const getAllSubjects = async (req,res,next) => {
  try {
    const isAdmin = req.locals.user.isAdmin
    if(isAdmin == true){
      const getSubject = await getAllSubjectsService()
      res.status(StatusCodes.OK).json(getSubject);
      return getSubject
    }else{
      res.status(StatusCodes.FORBIDDEN).send('Only admin can access all subjects ❌')
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const getSubjectByID = async (req,res,next) => {
  try {
    const isAdmin = req.locals.user.isAdmin
    if(isAdmin == true){
      const getSubjectbyID = await getSubjectByIDService(req.params.subjectID)
      res.status(StatusCodes.OK).json(getSubjectbyID);
      return getSubjectbyID
    }else{
      res.status(StatusCodes.FORBIDDEN).send('Only admin can access subjects ❌')
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const updateSubject = async (req,res,next) => {
  try {
    const isAdmin = req.locals.user.isAdmin
    if(isAdmin == true){
      const body = req.body
      // const updateSubjectObj = new Subject(firstName, lastName, email, password, subject)
      const updateSubject = await updateSubjectService(body,req.params.subjectID)
      res.status(StatusCodes.OK).send('Subject updated successfully.✅');
      return updateSubject
    }else{
      res.status(StatusCodes.FORBIDDEN).send('Only admin can update subjects ❌')
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const deleteSubject = async (req,res,next) => {
  try {
    const isAdmin = req.locals.user.isAdmin
    if(isAdmin == true){
      const deleteSubject = await deleteSubjectService(req.params.subjectID)
      res.status(StatusCodes.OK).send('Subject deleted successfully.✅');
      return deleteSubject
    }else{
      res.status(StatusCodes.FORBIDDEN).send('Only admin can delete subjects ❌')
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const assignSubject = async (req,res,next) => {
  try {
    const isAdmin = req.locals.user.isAdmin
    if(isAdmin == true){
      const {subjectId} = req.body
      const scoreObj = new Score(req.params.studentID,subjectId,null,null,null,null,req.locals.user.id,null)
      const assignSubject = await assignSubjectService(scoreObj)
      res.status(StatusCodes.OK).send('Subject assigned successfully.✅');
      return assignSubject
    }else{
      res.status(StatusCodes.FORBIDDEN).send('Only admin can assign subjects ❌')
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = {
    createSubject,
    getAllSubjects,
    getSubjectByID,
    updateSubject,
    deleteSubject,
    assignSubject
}