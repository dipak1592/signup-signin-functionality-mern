import express from "express"
import validation  from '../middleware/AuthValidation.js'
const { signupValidation ,loginValidation} = validation; 
import authentication from '../controllers/Authcontroller.js'
const {signup,login} = authentication;


const router = express.Router();

router.post("/login",loginValidation, login)

router.post("/signup",signupValidation, signup)

export default router
