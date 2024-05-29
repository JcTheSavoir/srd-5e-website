// ----------- middleware for checking ownership of item before the Update/Delete CRUD routes can be performed
import UItem from '../models/uItem.js';

const requireOwner = async (req, res, next) => {
    const userId = req.user._id;
    const { itemId } = req.body;

    try {
        //----------------- find item by it's id
        const item = await UItem.findById(itemId);
        // ------------------------ if no item found, return response code
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        };
        // if the item wasn't created by the user trying to edit it, send a forbidden response 
        if (item.userCreatedBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You do not have permission change this item' });
        };
        next();
    } catch (error) {
        console.error('Error in requireOwner middleware', error);
        res.status(500).json({ error: 'Server Error...' });
    };
};

export default requireOwner;