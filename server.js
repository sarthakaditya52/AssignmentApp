const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});