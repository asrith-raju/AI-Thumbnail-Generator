import mongoose from "mongoose";

// TypeScript interface describing a User document
export interface IUser extends Document {
    name: string;              // User's full name
    email: string;             // User's email address
    password?: string;         // Hashed password
    createdAt?: Date;          // Account creation time
    updatedAt?: Date;          // Last update time
}

// Mongoose schema definition for User
const UserSchema = new mongoose.Schema<IUser>(
    {
        // User's display name
        name: {
            type: String,
            required: true,
            trim: true,
        },

        // User's email (unique & lowercase)
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        // User's hashed password
        password: {
            type: String,
            required: true,
        },
    },
    {
        // Automatically adds createdAt & updatedAt fields
        timestamps: true,
    }
);

// Prevent model re-compilation during hot reloads
const User =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;