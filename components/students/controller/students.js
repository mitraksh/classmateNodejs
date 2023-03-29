const { createStudentService,
    getAllStudentsService,
    getStudentByIDService,
    updateStudentService,
    deleteStudentService,
    loginService} = require('../service/students')
const Student = require('../../../view/student')
const { StatusCodes } = require('http-status-codes')
const JwtToken = require('../../../middleware/jwt')
const { UnauthoirzedError, BadRequest } = require('../../../errors')

const verifyStudentLogin = async (req, res, next) => {
  try {
    console.log("inside login")
    const {email,password} = req.body
    const login = await loginService(email,password)
    if(login){
      const jwt = new JwtToken(login.id, login.firstName, login.lastName, login.email, null, null)
      const token = jwt.generate()
      console.log(token)
      res.cookie("authorization", token)
      res.status(StatusCodes.OK).send('You have successfully logged in ✅.\n'+ token)
    }else if(login == null){
      res.status(StatusCodes.EXPECTATION_FAILED).json(login)
      throw new UnauthoirzedError('Student not found ❌')
    }

  } catch (error) {
    console.error(error)
    next(error)
  }
}

const createStudent = async (req,res,next) => {
    try {
      const isAdmin = req.locals.user.isAdmin
      if(isAdmin == true){
        const {firstName, lastName, email, password,standard} = req.body
        const postStudentObj = new Student(firstName, lastName, email, password, standard)
        const postStudent = await createStudentService(postStudentObj)
        res.status(StatusCodes.OK).json(postStudent);
        return postStudent
      }else{
        res.status(StatusCodes.FORBIDDEN).send('Only admin can create a student ❌')
      }
     
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const getAllStudents = async (req,res,next) => {
  try {
    const isAdmin = req.locals.user.isAdmin
    if(isAdmin == true){
      const getStudent = await getAllStudentsService()
      res.status(StatusCodes.OK).json(getStudent);
      return getStudent
    }else{
      res.status(StatusCodes.FORBIDDEN).send('Only admin can access all students ❌')
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const getStudentByID = async (req,res,next) => {
  try {
    const isAdmin = req.locals.user.isAdmin
    if(isAdmin == true){
      const getStudentbyID = await getStudentByIDService(req.params.studentID)
      res.status(StatusCodes.OK).json(getStudentbyID);
      return getStudentbyID
    }else{
      res.status(StatusCodes.FORBIDDEN).send('Only admin can access students ❌')
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}
const updateStudent = async (req,res,next) => {
  try {
    const isAdmin = req.locals.user.isAdmin
    if(isAdmin == true){
      const body = req.body
      // const updateStudentObj = new Student(firstName, lastName, email, password, subject)
      const updateStudent = await updateStudentService(body,req.params.studentID)
      res.status(StatusCodes.OK).send('Student updated successfully.✅');
      return updateStudent
    }else{
      res.status(StatusCodes.FORBIDDEN).send('Only admin can update students ❌')
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const deleteStudent = async (req,res,next) => {
  try {
    const isAdmin = req.locals.user.isAdmin
    if(isAdmin == true){
      const deleteStudent = await deleteStudentService(req.params.studentID)
      res.status(StatusCodes.OK).send('Student deleted successfully.✅');
      return deleteStudent
    }else{
      res.status(StatusCodes.FORBIDDEN).send('Only admin can delete students ❌')
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = {
    verifyStudentLogin,
    createStudent,
    getAllStudents,
    getStudentByID,
    updateStudent,
    deleteStudent
}