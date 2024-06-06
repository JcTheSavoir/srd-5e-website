//Handling the CRUD request function for users
import User from '../models/user.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ---------------------------------------------------------{Login}------------------
const login = async(req, res) => {
    try {
    // Get email, username, and password 
        const { emailOrUsername, password} = req.body;
    // 2. Find User with requested email or username
        const user = await User.findOne({
            $or: [{ username: emailOrUsername }, { email: emailOrUsername }]
        });
    // 2a. If there is no user send response error status code
        if(!user) {
            return res.status(401).json({ message: 'Username or Email is Incorrect' });
        };
    // 3. Compare password with foundUser
        const passwordMatch = bcrypt.compareSync(password,user.password);
        //3a. If the password doesn't match response error status code
        if(!passwordMatch) {
            return res.status(401).json({ message: 'Password is Incorrect' });
        }
    // 4. Create JWT (token)
        // Date.now is in milliseconds ---> convert by the following: Date.now() + 1000 * 60 * 60 * 24 * 30
        // exp is to set an expiration date for the token.  In this case it's 30 days
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({sub: user._id, exp}, process.env.SECRET);
        // Check if token was successfully created with the login
        console.log('Token Created from Login', token);
        // Check which PRODUCTION environment variable is being used
        console.log('Production variable', process.env.PRODUCTION);

        // ----------------------------------------------------------Cookie
        res.cookie("Authorization", token, {
            // sets expiration 
            expires: new Date(exp),
            // allows only browser and server to read
            httpOnly: true,
            // for secure cookies when in production (currently render)
            secure: process.env.PRODUCTION === 'true',
            sameSite: "lax",
        });
        // 5. Send Response
        //---------------------- Send response via status code (also send user data)
        res.status(200).json({ user: {email: user.email, username: user.username, _id: user._id} });
    } catch (error) {
        // console.log(error)
        if (error.message) {
            const fields = error.message;
            if (fields.includes('Username or Email is Incorrect')) {
                return res.status(401).json({message: "Username or Email is Incorrect"})
            } else if (fields.includes('Password is Incorrect')) {
                return res.status(401).json({message: "Password is Incorrect"});
            };
        };
        res.status(500).json({ message: "Server Error..."})
    }
};

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
        // console.log('User Created', newUser);  

        //-----------------defining the body for use with the login function
        req.body = { emailOrUsername: email, password };
        //------------------Using the login function below to reduce redundant code
        await login(req, res);

    // VV------------------------VV--------Check for error, see if it's duplicate key error, print response
    } catch (error) {
        // console.log(error);
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
        res.status(500).json({ message: "Server Error..."});
    };
};
console.log('before auth')
//----------------------------------------{authentication Check}----------------------
const checkAuth = (req, res) => {
    console.log('between auth')
    //Ensure that it can be used to stay logged in during page refresh, send as actual json and not plain text
    if(req.user) {
        res.status(200).json({ user: req.user });
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    };
};

// ------------------------------------------------{Logout}------------------
const logout = (req, res) => {
    res.clearCookie("Authorization")
    res.sendStatus(200)
};

export default {
    signup,
    login,
    logout,
    checkAuth,
};
