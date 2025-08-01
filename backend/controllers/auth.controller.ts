import { Request, Response } from "express";
import User from "../modals/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password, name, avatar } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        //new user  
        const newUser = await User.create({ name, email, password, avatar: avatar || "" });

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        newUser.password = hashedPassword;
        await newUser.save();

        //generate token
        const token = generateToken(newUser);   
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        res.status(500).json({ message: "server error", error });
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        //find user by email
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }   

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid password" });
            return;
        }
        //generate token
        const token = generateToken(user);      
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "server error", error });
    }
}

export const checkEmail = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        res.status(200).json({ exists: !!user });
    } catch (error) {
        res.status(500).json({ message: "server error", error });
    }
}