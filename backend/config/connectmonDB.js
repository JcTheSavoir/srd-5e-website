// Connecting to the MongoDB database using mongoose
// 1. // -------------------{imports}--------------
import mongoose from 'mongoose'

const connectMonDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("SUCCESS; Connection to MongoDB Cluster Successful")        
    } catch (error) {
        console.error("FAIL; Unable to connect to MongoDB Cluster", error)
    }
}

export default connectMonDB;

