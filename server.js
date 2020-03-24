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

// Load Views 
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','pug');

// Routes
app.use('/api/admin', require('./routes/api/admin'));

app.get('/', (req,res) => {
    res.render('index', {
        title: 'Welcome'
    });
});
    
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});