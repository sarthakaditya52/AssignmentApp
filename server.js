const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); 

const config = require('config');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = config.get('mongoURI');

//Connect to Mongo
mongoose
    .connect(db, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true    
    })
    .then(() => console.log('MongoDB Connected....'))
    .catch(err => console.log(err));

    
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});