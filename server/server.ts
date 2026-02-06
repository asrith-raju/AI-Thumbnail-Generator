// Import Express and its Request/Response types
import express, { Request, Response } from "express";

// CORS middleware to handle cross-origin requests
import cors from "cors";

// Load environment variables from .env
import "dotenv/config";

// MongoDB connection helper
import connectDB from "./configs/db.js";

// Session middleware for authentication
import session from "express-session";

// MongoDB-backed session store
import MongoStore from "connect-mongo";

// Route handlers
import AuthRouter from "./routes/AuthRoutes.js";
import ThumbnailRouter from "./routes/ThumbnailRoutes.js";
import UserRouter from "./routes/UserRoutes.js";

// Extend express-session types to include custom session fields
declare module "express-session" {
    interface SessionData {
        isLoggedIn: boolean;
        userId: string;
    }
}

// Connect to MongoDB before starting the server
await connectDB();

// Initialize Express app
const app = express();

// Trust reverse proxy (required for secure cookies on Vercel/Render)
app.set("trust proxy", 1);

// Enable CORS with credentials support
// This allows cookies (sessions) to be sent from the frontend
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:3000",
            process.env.FRONTEND_URL as string,
        ],
        credentials: true,
    })
);

// Configure session management
app.use(
    session({
        // Secret key used to sign the session ID cookie
        secret: process.env.SESSION_SECRET as string,

        // Prevent session from being saved if unmodified
        resave: false,

        // Do not create session until something is stored
        saveUninitialized: false,

        // Store sessions in MongoDB for persistence
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI as string,
            collectionName: "sessions",
        }),

        // Session cookie configuration
        cookie: {
            // Session expiration: 7 days
            maxAge: 1000 * 60 * 60 * 24 * 7,

            // Prevent client-side JS from accessing cookies
            httpOnly: true,

            // Required for HTTPS (production environments)
            secure: true,

            // Required for cross-site cookies (frontend & backend on different domains)
            sameSite: "none",
        },
    })
);

// Parse incoming JSON request bodies
app.use(express.json());

// Health check / base route
app.get("/", (_req: Request, res: Response) => {
    res.send("Server is Live!");
});

// Authentication routes (login, register, logout)
app.use("/api/auth", AuthRouter);

// Thumbnail generation routes
app.use("/api/thumbnail", ThumbnailRouter);

// User-related routes (profile, user thumbnails, etc.)
app.use("/api/user", UserRouter);

// Server port (fallback to 3000 if not defined)
const port = process.env.PORT || 3000;

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Export app (useful for testing or serverless adapters)
export default app;