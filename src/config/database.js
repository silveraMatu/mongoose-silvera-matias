import mongoose from "mongoose"

const CONNECTION_STRING = process.env.CONNECTION_STRING

export const connectDB = async()=>{
   try {
    await mongoose.connect(CONNECTION_STRING)

    // await mongoose.connection.dropDatabase()
    console.log("Conectado exitosamente con la base de datos.");
   
    } catch (error) {
    console.log("Hubo un problema al conectarse de con la DB");
   }
}