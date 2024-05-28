//Server
//-----------------------{toplevel imports}----------------
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectMonDB from './config/connectMonDB.js';
import userRoute from './routes/userRoute.js';
import itemRoute from './routes/uItemRoute.js'
import cookieParser from 'cookie-parser';

//---------------------------{Variables} ----------------
dotenv.config()
const PORT = process.env.PORT || 3000;
const app = express()

//Middleware from express, cors, and cookie-Parser
app.use(express.json());

app.use(cors(({
    //---------------Cors specific settings 
    //---VV---Needed to let cookies be requested 
    credentials: true,
    // ---VV---Set for where the request should be coming from (May need modified for actual deployment?)
    origin: 'http://localhost:5173',
    // ---VV-----Set which headers to allow in request to the server.  Currently only 
    // using this "Content-Type" header (May need updated)
    allowedHeaders: ['Content-Type']
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
    res.send("Start page for server")
});

//--------------------------{Starting the server}-------------
app.listen(PORT, () => {
    console.log(`Express Server; Currently Listening on port: ${PORT}`)
})


