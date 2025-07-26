import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async(req,res) =>{
    const {name,email,password} = req.body;
    try{
        const existing = await User.findOne({email})
        if (existing)
            return res.status(400).json({error:"User already exists"})

        const hashed = await bcrypt.hash(password,10)

        const user = await User.create({name,email,password:hashed})

        const token = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'7d'})

        res.status(201).json({token, user: {id:user._id, name:user.name, email:user.email}})

    }
    catch(error){
        console.error("Signup error",error)
        res.status(500).json({error:'Signup failed'})
    }
}

export const login = async(req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email})

        if (!user)
            return res.status(400).json({error:"Invalid email"})

        const match = await bcrypt.compare(password,user.password);
        if(!match)
            return res.status(400).json({error:"Invalid password"})

        const token = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'7d'})

        res.status(200).json({token,user : {id:user._id, name:user.name, email:user.email}})
    }
    catch(err){
        console.error("login error",err)
        return res.status(500).json({error:"Login failed"})
    }
}