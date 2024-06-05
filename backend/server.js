//Server
//-----------------------{toplevel imports}----------------
import dotenv from 'dotenv';
console.log("dotenv import successful")
import express from 'express';
console.log("express import successful")
import cors from 'cors';
console.log("cors import successful")
import connectMonDB from './config/connectMonDB.js';
console.log("connectMonDB.js import successful")
import userRoute from './routes/userRoute.js';
console.log("userRoute.js import successful")
import itemRoute from './routes/uItemRoute.js';
console.log("uItemRoute.js import successful")
import cookieParser from 'cookie-parser';
console.log("cookie-parser import successful")

//---------------------------{Variables} ----------------
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

//Middleware from express, cors, and cookie-Parser
app.use(express.json());

app.use(cors(({
    //---------------Cors specific settings 
    //---VV---Needed to let cookies be requested 
    credentials: true,
    // ---VV---Set for where the request should be coming from (May need modified for actual deployment?)
    origin: 'http://0.0.0.0:5173',
    // ---VV-----Set which headers to allow in request to the server.  Currently only 
    // using this "Content-Type" header (May need updated)
    allowedHeaders: ['Content-Type'],
})));
app.use(cookieParser());

//Connect to our database by calling the function
connectMonDB();

//------------------------------------{User Routes}---------
app.use('/', userRoute);

//---------------------------------{User Item Routes}
app.use('/items', itemRoute);

//--------------------------------{Base Route}----------
app.get('/', (req, res) => {
    res.send("Start page for server");
});

//--------------------------{Starting the server}-------------
app.listen(PORT, () => {
    console.log(`Express Server; Currently Listening on port: ${PORT}`);
});


