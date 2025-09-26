import mongoose from "mongoose";
import {DB_URI, NODE_ENV} from "../config/env.js";

if(!DB_URI) {
    throw new Error("Database hilang di .env.<developement/production>.local njrrr");
}

const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to Database in ${NODE_ENV} mode`);
    } catch (error) {
        console.log("Error connecting to database ", error);
        process.exit(1);
    }
}

export default connectToDB;