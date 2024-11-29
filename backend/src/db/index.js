import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\nMongoDB is successfully connected`)
    }catch (error){
        console.log("MongoDB CONNECTION FAILED :", error);
    }
}
export default connectDB;