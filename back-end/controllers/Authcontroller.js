// import { response } from "express"
import { User } from "../models/User.js"
import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken"

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const usermodel = await User.findOne({ email })

        if (usermodel) {
            return res
                .status(409)
                .json({ message: 'User is already exist,you can login', success: false })
        }
        const user = new User({ name, email, password })
        user.password = await bcrypt.hash(password, 10)
        await user.save()
        res.status(201)
            .json({
                message: "signup Successfully",
                success: true
            })
    } catch (error) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }

}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const usermodel = await User.findOne({ email })
        const errorMessage = "Authentication failed email and password in wrong"
        if (!usermodel) {
            return res
                .status(403)
                .json({ message: errorMessage, success: false })
        }
        const isPassEqual = await bcrypt.compare(password, usermodel.password)
        if (!isPassEqual) {
            return res
                .status(403)
                .json({ message: errorMessage, success: false })
        }

        const jwtToken = jwt.sign(
            {email:usermodel.email, _id: usermodel._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        
        res.status(200)
            .json({
                message: "Login Successfully",
                success: true,
                jwtToken,
                email:email,
                name:usermodel.name
            })
    } catch (error) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }

}

export default { signup, login }