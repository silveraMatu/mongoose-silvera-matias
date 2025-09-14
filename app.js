import express from "express";
import "dotenv/config"
import { connectDB } from "./src/config/database.js";
import { routes } from "./src/routes/index.routes.js";

const app = express()

const PORT = process.env.PORT

app.use(express.json())

app.use("/api",routes)

app.listen(PORT, async()=>{
    await connectDB()
    console.log(">>SERVER CORRIENDO");
})