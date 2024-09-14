import express from "express"
import dotenv from 'dotenv'
import bodyParser from "body-parser"
import cors from "cors"
import db_connect from "./models/db.js"
import Authrouter from "./routes/Authrouter.js"
import Productrouter from "./routes/Productrouter.js"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 8080;

app.get("/ping",(req,res) =>{
    res.send("<h2>PONG</h2>")
})

app.use(bodyParser.json())
app.use(cors())
app.use("/auth",Authrouter)
app.use("/products",Productrouter)

app.listen(PORT, () =>{
    console.log(`server is runnig on port no:-${PORT}`);
})

