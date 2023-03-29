const { createExaminerService,
    getAllExaminerService,
    getAllExaminerByIDService,
    updateExaminerService,
    deleteExaminerService,
    loginService} = require('../service/examiner')
const Examiner = require('../../../view/examiner')
const { StatusCodes } = require('http-status-codes')
const JwtToken = require('../../../middleware/jwt')
const { UnauthoirzedError, BadRequest } = require('../../../errors')

const verifyLogin = async (req, res, next) => {
  try {
    const {email,password} = req.body
    const login = await loginService(email,password)
    if(login){
      const jwt = new JwtToken(login.id, login.first_name, login.last_name, login.email, login.is_admin)
      const token = jwt.generate()
      console.log(token)
      res.cookie("authorization", token)
      res.status(StatusCodes.OK).send('You have successfully logged in.\n'+ token)
    }else if(login == null){
      res.status(StatusCodes.EXPECTATION_FAILED).json(login)
      throw new UnauthoirzedError('Examiner not found')
    }

  } catch (error) {
    console.error(error)
    next(error)
  }
}

const createExaminer = async (req,res,next) => {
    try {
      const isAdmin = req.locals.user.isAdmin
      if(isAdmin == true){
        const {firstName, lastName, email, password, subjectId} = req.body
        const postExaminerObj = new Examiner(firstName, lastName, email, password, subjectId)
        const postExaminer = await createExaminerService(postExaminerObj)
        res.status(StatusCodes.OK).json(postExaminer);
        return postExaminer
      }else{
        res.status(StatusCodes.FORBIDDEN).send('Only admin can create an examiner')
      }
     
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const getAllExaminer = async (req,res,next) => {
  try {
    const isAdmin = req.locals.user.isAdmin
    if(isAdmin == true){
      const getExaminer = await getAllExaminerService()
      res.status(StatusCodes.OK).json(getExaminer);
      return getExaminer
    }else{
      res.status(StatusCodes.FORBIDDEN).send('Only admin can access all examiners')
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const getAllExaminerByID = async (req,res,next) => {
  try {
    const isAdmin = req.locals.user.isAdmin
    if(isAdmin == true){
      const getExaminerbyID = await getAllExaminerByIDService(req.params.examinerID)
      res.status(StatusCodes.OK).json(getExaminerbyID);
      return getExaminerbyID
    }else{
      res.status(StatusCodes.FORBIDDEN).send('Only admin can access examiners')
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}
const updateExaminer = async (req,res,next) => {
  try {
    const isAdmin = req.locals.user.isAdmin
    if(isAdmin == true){
      if(req.params.examinerID == '1'){
        throw new BadRequest('You cannot update admin details.')
      }
      const body = req.body
      // const updateExaminerObj = new Examiner(firstName, lastName, email, password, subject)
      const updateExaminer = await updateExaminerService(body,req.params.examinerID)
      res.status(StatusCodes.OK).send('Examiner updated successfully.✅');
      return updateExaminer
    }else{
      res.status(StatusCodes.FORBIDDEN).send('Only admin can update examiners')
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const deleteExaminer = async (req,res,next) => {
  try {
    const isAdmin = req.locals.user.isAdmin
    if(isAdmin == true){
      if(req.params.examinerID == '1'){
        throw new BadRequest('You cannot delete admin details.')
      }
      const deleteExaminer = await deleteExaminerService(req.params.examinerID)
      res.status(StatusCodes.OK).send('Examiner deleted successfully.✅');
      return deleteExaminer
    }else{
      res.status(StatusCodes.FORBIDDEN).send('Only admin can update examiners')
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = {
    verifyLogin,
    createExaminer,
    getAllExaminer,
    getAllExaminerByID,
    updateExaminer,
    deleteExaminer
}