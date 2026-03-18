import express from 'express'
import cors from "cors"
import dotenv from "dotenv"
import pool from './config/db.js';
import userRoutes from "./routes/userRoutes.js"
import errorHandling from './middleware/errorHandler.js';
import createUserTable from './data/createUserTable.js';
import createAdsTable from './data/createAdsTable.js';


dotenv.config();
const app =express();
const port=process.env.PORT || 8080

//MiddleWares
app.use(express.json())
app.use(cors())

//Routes
app.use("/api",userRoutes)

//Error Handling
app.use(errorHandling)
//Create user table if not exists
createUserTable()
createAdsTable()
//Testing postgres Connection
app.get('/',async(req,res)=>{
    const result=await pool.query("SELECT current_database()")
    res.send("The database name is :"+result.rows[0].current_database)
})
//server running

app.listen(port,()=>{
    console.log("Server at : http://localhost:"+port )
})