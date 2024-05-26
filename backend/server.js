//Server
//-----------------------{toplevel imports}----------------
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectMonDB from './config/connectMonDB.js';
import userRoute from './routes/userRoute.js';

//---------------------------{Variables} ----------------
dotenv.config()
const PORT = process.env.PORT || 3000;
const app = express()

//Middleware from express and cors
app.use(express.json());
app.use(cors())

//Connect to our database by calling the function
connectMonDB();

//------------------------------------{User Authentication Routes}---------
app.use('/', userRoute)

//--------------------------------{Base Route}----------
app.get('/', (req, res) => {
    res.send("Start page for server")
});

//--------------------------{Starting the server}-------------
app.listen(PORT, () => {
    console.log(`Express Server; Currently Listening on port: ${PORT}`)
})


