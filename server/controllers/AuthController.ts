import { Request, response, Response } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

// controller for user registration 

export const register = async (req: Request, res: Response) => {
    try {
        const { name,email,password } = req.body;
        //Find user by mail
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        //Encrypt the password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({name,email,password:hashedPassword});
        await newUser.save();

        //setting user data in sessions
        req.session.isLoggedIn = true;
        req.session.userId = newUser._id;

        return res.json({
            message:"Account Created successfully",
            user:{
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email
            }
        })

    }
     catch (error:any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// controller for user login

export const loginUser = async(req: Request, res: Response) => {
      try {
        const {email,password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password '});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid email or password '});
        }

        //setting user data in sessions
        req.session.isLoggedIn = true;
        req.session.userId = user._id;

        return res.json({
            message:"Logged in successfully",
            user:{  
                _id:user._id,
                name:user.name,
                email:user.email
            }
        })

      } catch (error:any) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
}
