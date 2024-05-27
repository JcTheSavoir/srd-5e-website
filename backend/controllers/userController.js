//Handling the CRUD request function for users
import User from '../models/user.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ------------------------------------------------{signup}------------------
const signup = async(req, res) => {
    try {
        // ----------------------------Get email, username, and password
        const {email, username, password} = req.body;
        //-------------------------------** Hash Password {use bcryptjs} **/
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        //------------------------ create the user from the given data above
        const newUser = await User.create({
            email, 
            username,
            password: hashedPassword
        });
        console.log('User Created', newUser)

        //----------------VV ensure that password is not sent in the response VV
        const userNoPass = {
            email: newUser.email,
            username: newUser.username,
            _id: newUser._id,
        };

        //---------------------- Send response via status code (also send user data)
        res.status(201).json({ message: "New User Created Successfully", user: userNoPass })
    // VV------------------------VV--------Check for error, see if it's duplicate key error, print response
    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            const fields = Object.keys(error.keyPattern);
            if (fields.includes('username') && fields.includes('email')) {
                return res.status(409).json({message: "Both username and email are already being used"})
            } else if (fields.includes('username')) {
                return res.status(409).json({message: "This Username is already being used"});
            } else if (fields.includes('email')) {
                return res.status(409).json({ message: 'This Email is already being used'});
            };
        };
        res.status(500).json({ message: "Server Error..."})
    }
}

// ---------------------------------------------------------{Login}------------------
const login = async(req, res) => {
    try {
    // Get email, username, and password 
        const {email, username, password} = req.body
    // 2. Find User with requested email or username
        const user = await User.findOne({
            $or: [{username}, {email}]
        });
        console.log(`User: ${user}`)
    // 2a. If there is no user send response error status code
        if(!user) return res.sendStatus(401)
    // 3. Compare password with foundUser
        const passwordMatch = bcrypt.compareSync(password,user.password)
        //3a. If the password doesn't match response error status code
        if(!passwordMatch) return res.sendStatus(401)
    // 4. Create JWT (token)
        // Date.now is in milliseconds ---> convert by the following: Date.now() + 1000 * 60 * 60 * 24 * 30
        // exp is to set an expiration date for the token.  In this case it's 30 days
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30
        const token = jwt.sign({sub: user._id, exp}, process.env.SECRET)

        // ----------------------------------------------------------Cookie
        res.cookie("Authorization", token, {
            // sets expiration 
            expires: new Date(exp),
            // allows only browser and server to read
            httpOnly: true,
            sameSite: "lax"
        });
        // 5. Send Response
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
    }
};
//----------------------------------------{authentication Check}----------------------
const checkAuth = (req, res) => {
    console.log(req.user)
    res.sendStatus(200)
}

// ------------------------------------------------{Logout}------------------
const logout = (req, res) => {
    res.clearCookie("Authorization")
    res.sendStatus(200)
}

export default {
    signup,
    login,
    logout,
    checkAuth,
};
