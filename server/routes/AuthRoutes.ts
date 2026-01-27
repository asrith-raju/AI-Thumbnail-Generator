import express from "express";
import { registerUser } from "../controllers/AuthController.js";

const AuthRouter = express .Router();

AuthRouter.post('/register',registerUser)
