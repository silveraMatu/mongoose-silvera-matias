import express from "express";
import "dotenv/config"
import { connectDB } from "./src/config/database";

const app = express()

const PORT = process.env.PORT

app.use(express.json())

app.listen(PORT, async()=>{
    await connectDB()
    console.log(">>SERVER CORRIENDO");
})