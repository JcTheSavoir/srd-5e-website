import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const requireAuth = async( req, res, next) => {
    try {
        // 1. Read token off cookie
        const token = req.cookies.Authorization
        // 2. Decode Token --> jwt
        const decoded = jwt.verify(token, process.env.SECRET)
        // 3. Find user [decoded sub]
        const user = await User.findById(decoded.sub)
        if(!user) {
            return res.sendStatus(401)
        }
        // 4. Attach user to request
        req.user = user
        next()        
    } catch (error) {
        console.log("Authentication Failed", error)
        return res.sendStatus(500)
    }
};

export default requireAuth;

