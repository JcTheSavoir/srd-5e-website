//Handling the Schema being used for uItem for CRUD operations (for user created Items)
//--------------------------{imports}-------------
import mongoose from "mongoose";

//-------Define Schema
const uItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    rarity:{
        type: String,
        required: true,
    },
    base: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    attunement: {
        type: Boolean,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userCreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {timestamps: true});

const UItem = mongoose.model("UItem", uItemSchema);

export default UItem;