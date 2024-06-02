// Handling the CRUD request function for uItems
import UItem from '../models/uItem.js';

// ---------------------------------------------------------{Create Item}------------------
const createItem = async (req, res) => {
    try {
        // ----------------------------Get name, rarity, base, category, attunement, and description from request body
        const { name, rarity, base, category, attunement, description } = req.body;
        // --------------------------- Get Id of user creating the item
        const userCreatedBy = req.user._id;
        // ------------------------Create new item
        const newItem = await UItem.create({
            name,
            rarity,
            base,
            category,
            attunement,
            description,
            userCreatedBy,
        });
        // ----------------------Send response via status code (also send item data)
        res.status(201).json(newItem);
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            const fields = Object.keys(error.keyPattern);
            // if the name of the item is already in the database, send response explaining that
            // Able to do this because the "unique" property is set in the item Schema
            if (fields.includes('name')) {
                return res.status(409).json({ message: 'This name is already being used' });
            };
        };
        res.status(500).json({ message: 'Server Error...' });
    }
};

// ---------------------------------------------------------{Read Items}------------------
// -------------------------Fetch all items created by the user
const getUserItems = async (req, res) => {
    const userId = req.user._id;
    try {
        //--------------------- Find items based on the current users userId
        const items = await UItem.find({ userCreatedBy: userId });
        res.status(200).json(items);
    } catch (error) {
        console.error('Error Fetching User Items', error);
        res.status(500).json({ error: 'Server Error...' });
    }
};
// -------------------------Fetch all items (public view)
const getAllItems = async (req, res) => {
    try {
        // ----------- replacing the _id of the user with their username 
        const items = await UItem.find().populate('userCreatedBy', 'username');
        // ----------------------Send response via status code (also send item data)
        res.status(200).json(items);
    } catch (error) {
        console.error('Error Fetching All Items', error);
        res.status(500).json({ error: 'Server Error...' });
    }
};
// ---------------------------------------------------------{Update Item}------------------
const updateItem = async (req, res) => {
    const userId = req.user._id;
    const { itemId, ...updateData } = req.body;

    try {
        const item = await UItem.findOne({ _id: itemId, userCreatedBy: userId });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        };
        // ------ add the updated details to the item
        Object.assign(item, updateData);
        // --------- instead of creating a new item ( .create ), we save the data to the 
        // existing item in the database ( .save )
        await item.save();
        console.log('Updated Item', item);
        // ----------------------Send response via status code (also send the updated item data)
        res.status(200).json(item);
    } catch (error) {
        console.error('Error Updating Item', error);
        res.status(500).json({ error: 'Server Error...' });
    }
};

// ---------------------------------------------------------{Delete Item}------------------
const deleteItem = async (req, res) => {
    const userId = req.user._id;
    const { itemId } = req.body;

    try {
        // find the item based off the items Id, and then delete it from the database
        const item = await UItem.findOneAndDelete({ _id: itemId, userCreatedBy: userId });
        // if item isn't found, send the response error
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        console.log('Deleted Item', item);
        // ----------------------Send response via status code if item is found and deleted
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error Deleting Item', error);
        res.status(500).json({ error: 'Server Error...' });
    }
};

export default {
    createItem,
    getUserItems,
    getAllItems,
    updateItem,
    deleteItem,
};