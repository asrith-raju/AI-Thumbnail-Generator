import mongoose from "mongoose";

// Function to establish a connection with MongoDB
const connectDB = async () => {
    try {
        // Listen for successful MongoDB connection
        mongoose.connection.on("connected", () => {
            console.log("Database connected");
        });

        // Connect to MongoDB using connection string from environment variables
        await mongoose.connect(process.env.MONGODB_URI as string);
    } catch (error) {
        // Log database connection errors
        console.error("Database connection error:", error);
    }
};

export default connectDB;