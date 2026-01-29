import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected',  ()=>{
            console.log("Database connected");
        });
        await mongoose.connect(process.env.MONGODB_URI as string);
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

export default connectDB;