import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const mongo_url = process.env.MONGO_CONN


const db_connect = mongoose.connect(mongo_url)
.then(() =>{
    console.log("MongoDB Connected Succcessfully...😍")
})
.catch((error) =>{
    console.log("Connection Failed...😒",error)
})

export default db_connect
