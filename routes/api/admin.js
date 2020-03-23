const express = require('express');
const router = express.Router();
const config = require('config');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

// Assignment Model
const Assignment = require('../../model/Assignment');

// @route ->-> Get api/admin/createAssignments  
// @description ->-> Create Assignment Page
// @access ->->Public
router.get('/createAssignments', (req, res) => {
    res.render('addAssignment');
});

// @route ->-> POST api/admin/createAssignments  
// @description ->-> Put Assignments 
// @access ->->Public
router.post('/createAssignments', (req,res) => {
    assignment = new Assignment;
    assignment.name = req.body.name;
    assignment.task = req.body.task;
    assignment.day = req.body.day;

    assignment.save( function(err) {
        if(err)
            {
                console.log(err);
                return;
            }
        else
            res.render('index', {
                title: 'Assignment Added'
            });
    });
    return
});


module.exports = router;