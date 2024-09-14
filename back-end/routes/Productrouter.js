import express from "express"
import ensureAuthenticated from "../middleware/Auth.js";
const router = express.Router();

router.get("/",ensureAuthenticated,(req,res) =>{
    console.log("----logged in user details ----",req.user) // real time project ma koi user na relate data joto hoy to project na game te page ma router ma etc, to teva reasion ma biji var user ni info no levi pase te mate te data ne ek object ma store kari sakay che for example aa (req.user) to teno use project ke app ma game te page ma ke pachi router ma use kari sakay che and aa best prectice kevay che and ek database call ne bachavi sakay che to tena ni data improvement infance thay che
    res.status(200).json([
        {
            name:"mobile",
            price:24590,
        },
        {
            name:"tv",
            price:45590,
        }
    ])
})


export default router

