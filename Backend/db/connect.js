import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
import 'dotenv/config';

const connectToDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL)
        .then(console.log("Sucessfully Connected to MongoDB"))
    } catch (error) {
        console.log("Failed to connect to mongoDB " , error);
        process.exit(1); // Stop the server if db fails 
    }
};

export default connectToDB;