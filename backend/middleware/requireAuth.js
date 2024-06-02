// ----------------------middleware for authenticating user
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const requireAuth = async( req, res, next) => {
    try {
        // 1. Read token off cookie
        const token = req.cookies.Authorization;
        // If no token is available (as in a user isn't currently logged in) then the code will send
        // a 401 code (these will help prevent the catch block from firing)
        if (!token) {
            return res.status(401).json({ message: 'No token available' });
        };
        // 2. Decode Token --> jwt
        const decoded = jwt.verify(token, process.env.SECRET);
        // 3. Find user [decoded sub]
        const user = await User.findById(decoded.sub);
        // if no user can be found, then another 401 code with message 
        if(!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        };
        // 4. Attach user to request
        req.user = user;
        next();       
    } catch (error) {
        // console.log("Authentication Failed", error);
        return res.status(500).json({ message: "Server Error..." });
    };
};

export default requireAuth;

