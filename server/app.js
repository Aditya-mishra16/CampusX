const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

dotenv.config({path: './config.env' });
require('./db/conn')
// const User = require('./model/userSchema');
app.use(cookieParser()) ;
app.use(express.json());
app.use(cors());
app.use(require('./router/auth'));

const DB= process.env.DATABASE;
const PORT= process.env.PORT;

//Middleware
// const middleware = (req,res,next)=>{
//     console.log('Im middleware');
//     next();
// }

// app.get('/',(req,res)=>{
//     res.send('Hello world')
// });

// app.get('/about',middleware,(req,res)=>{
//     res.send('Hello Im about')
// });

app.listen(PORT,()=>{
    console.log(`server has sarted on port ${PORT}`)
})
