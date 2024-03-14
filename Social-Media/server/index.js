const dotenv = require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')


app.use(cors());


//mongoose connection code
mongoose.connect('mongodb://127.0.0.1:27017/social-media')
    .then(() => console.log('database connected'))
    .catch((error) => console.log('Database is not connected', err))



//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))



//router
app.use('/', require('./route/userRoute'))




const port = 5000;
app.listen(port, (error) => {
    if (error) throw console.log('not connected to server : ', error);
    console.log(`server is runing in port : ${port}`);
});