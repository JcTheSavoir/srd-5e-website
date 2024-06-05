// Connecting to the MongoDB database using mongoose
// 1. // -------------------{imports}--------------
// github showing file as connectmonDB.js instead of it's current "connectMonDB.js".  Checking if recommit will resolve the issue
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

