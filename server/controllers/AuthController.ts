import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

// Controller to handle user registration
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Check if a user with the same email already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Generate salt and hash the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        // Store login state in session
        req.session.isLoggedIn = true;
        req.session.userId = newUser._id;

        // Return user details (excluding password)
        return res.json({
            message: "Account Created successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Controller to handle user login
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        // Compare entered password with hashed password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        // Store login state in session
        req.session.isLoggedIn = true;
        req.session.userId = user._id;

        // Return logged-in user details
        return res.json({
            message: "Logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Controller to handle user logout
export const logoutUser = (req: Request, res: Response) => {
    // Destroy the session to log the user out
    req.session.destroy((error) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    });

    return res.json({ message: "Logged out successfully" });
};

// Controller to verify logged-in user session
export const verifyUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;

        // Fetch user details without password
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Invalid User" });
        }

        // Return verified user details
        return res.json({ user });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};