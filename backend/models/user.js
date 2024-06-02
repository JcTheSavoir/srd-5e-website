//Handling the Schema being used for users involved in CRUD operations
//--------------------------{imports}-------------
import mongoose from "mongoose";

//-------Define Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);

export default User;

