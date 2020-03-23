const express = require('express');
const router = express.Router();
const config = require('config');

// User Model
const Assignment = require('../../model/Assignment');

router.get('/', (req, res) => {
    res.render('index',{
        title: 'working'
    })
})

router.get('/createAssignments', (req, res) => {
    res.render('addAssignment')
})

module.exports = router;