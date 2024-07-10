import mongoose from "mongoose";
require("dotenv").config();

const connectToDB = async ()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Connected to DB");
    })
    .catch(()=>{
        console.log("Error connecting to DB");
    })
}
export default connectToDB;