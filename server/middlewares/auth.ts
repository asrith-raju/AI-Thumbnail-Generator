import { Request, Response, NextFunction } from "express";

// Middleware to protect routes that require authentication
const protect = async (req: Request, res: Response, next: NextFunction) => {
    // Extract authentication details from session
    const { isLoggedIn, userId } = req.session;

    // If user is not logged in or session is missing userId, deny access
    if (!isLoggedIn || !userId) {
        return res.status(401).json({
            message: "You are not logged in",
        });
    }

    // User is authenticated, proceed to the next middleware/controller
    next();
};

export default protect;