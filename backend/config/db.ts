import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;