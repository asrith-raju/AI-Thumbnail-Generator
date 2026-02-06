import express from "express";

// Authentication controller functions
import {
    loginUser,
    logoutUser,
    registerUser,
    verifyUser,
} from "../controllers/AuthController.js";

// Middleware to protect authenticated routes
import protect from "../middlewares/auth.js";

// Create authentication router
const AuthRouter = express.Router();

// Register a new user
AuthRouter.post("/register", registerUser);

// Login user and create session
AuthRouter.post("/login", loginUser);

// Verify logged-in user session (protected route)
AuthRouter.get("/verify", protect, verifyUser);

// Logout user and destroy session
AuthRouter.post("/logout", logoutUser);

export default AuthRouter;