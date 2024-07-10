"use server"
import connectToDB from "@/app/database";
import User from "@/models";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
require("dotenv").config();
export async function SignUpAction(formData){
    await connectToDB();
    try {
        const {email, userName, password} = formData;
        const checkUser = await User.findOne({email: email});
        if(checkUser){
            return {
                success:false,
                message: "Already Registered",
            }
        }
        console.log("test1");
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newlyUser = new User({
            password:hashedPassword,
            email,
            userName,
        })
        console.log("test2");
        const savedUser = await newlyUser.save();
        if(savedUser){
            return {
                success:true,
                data: JSON.parse(JSON.stringify(savedUser)),
                message:"User created successfull",
            }
        }
        else{
            return {
                success:false,
                message:"User created Failed",
            }
        }
    } catch (error) {
        return {
            success:false,
            message: "Error Occured",
        }
    }

}
export async function loginAction(formData){
    await connectToDB();
    const {email, password} = formData;
    try {
        const checkUser = await User.findOne({email:email});
        if(!checkUser){
            return {
                success:false,
                message:"User Does'nt Exist",
            }
        }
        const checkPass = await bcrypt.compare(password, checkUser.password);
        if(checkPass){

            const createTokenData = {
                id: checkUser._id,
                userName: checkUser.userName,
                email: checkUser.email,
            }

            const token = jwt.sign(createTokenData, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });

            const getCookies = cookies();
            getCookies.set("token", token);
            return {
                success: true,
                message: "User LogedIn success",

            }
        }
        else{
            return {
                success: false,
                message: "Password is Incorrect",
                status: 400,
            }
        }
    } catch (error) {
        return {
            success:false,
            message:"Something went Wrong",
        }
    }
}