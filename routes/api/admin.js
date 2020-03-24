const express = require('express');
const router = express.Router();
const config = require('config');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

// Assignment Model
const Assignment = require('../../model/Assignment');
const Course = require('../../model/Course');

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
    const { name } = req.body;
    Course.findOne( { name} ).then( (course,err) => {
        if(err)
        {
            console.log(err);
        }
        else if (course)
        {
            assignment = new Assignment;
            assignment.task = req.body.task;
            assignment.day = req.body.day;
            for (var i = 0; i < course.assignments.length; i++)
            {
                if (course.assignments[i].day == req.body.day)
                    {
                        course.assignments.splice(i,1);
                    }
            }
            course.assignments.push(assignment);
            course.assignments.sort((a, b) => a.day - b.day);
        }
        else
        {
            assignment = new Assignment;
            course = new Course;
            course.name = req.body.name;
            assignment.task = req.body.task;
            assignment.day = req.body.day;
            course.assignments.push(assignment);
  
        }
        course.save( function(err) {
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
    });
    return;
});

// @route ->-> GET  api/admin/Assignments 
// @description ->-> View Assignments 
// @access ->-> Public
router.get('/Assignments', (req, res) => {
    Course.find({}, function(err, courses){
        if(err)
        {
            console.log(err);
            return;
        }
        else
        {
            res.render('viewAssignments', {
                title: 'Assignments',
                courses: courses
            });
        }
    });
});

// @route ->-> GET  api/admin/Assignment/:id 
// @description ->-> View Single Assignment 
// @access ->-> Public
router.get('/Assignment/:id', (req, res) => {
    Course.find({}, function(err, courses){
        if(err)
        {
            console.log(err);
            return;
        }
        else
        {
            assignment = new Assignment;
            var Course = ''
            for(var i = 0; i < courses.length; i++)
            {
                for(var j = 0; j < courses[i].assignments.length; j++)
                {
                    if(courses[i].assignments[j]._id == req.params.id)
                    {
                        assignment = courses[i].assignments[j];
                        Course = courses[i].name;
                        j = courses[i].assignments.length + 1;
                        i = courses.length + 1;
                        break;
                    }    
                }
            }
            res.render('updateAssignment', {
                title: 'Edit or Remove Assignment',
                course: Course,
                assignment: assignment
            });
        }
    });
});

// @route ->-> POST api/admin/deleteAssignment/:id
// @description ->-> Delete Assignments 
// @access ->-> Public
router.post('/deleteAssignment/:id', (req, res) => {
    var id = null;
    var course = {};
    var flag = false;
    Course.find({}, function(err, courses){
        if(err)
        {
            console.log(err);
            return;
        }
        else
        {
            for(var i = 0; i < courses.length; i++)
            {
                for(var j = 0; j < courses[i].assignments.length; j++)
                {
                    if(courses[i].assignments[j]._id == req.params.id)
                    {
                        courses[i].assignments.splice(j,1);
                        if(courses[i].assignments.length < 1)
                            flag = true;
                        id = courses[i]._id;
                        course.name = courses[i].name;
                        course.assignments = courses[i].assignments;
                        j = courses[i].assignments.length + 1;
                        i = courses.length + 1;
                        break;
                    }    
                }
            }
            var query = {_id: id};
            if (flag)
            {
                Course.deleteOne(query, function(err) {
                    if(err)
                        {
                            console.log(err);
                            return;
                        }
                    else
                        res.render('index', {
                            title: 'Course Deleted'
                        });
                });
            }
            else
            {
                Course.updateOne(query, course, function(err) {
                    if(err)
                        {
                            console.log(err);
                            return;
                        }
                    else
                        res.render('index', {
                            title: 'Assignment Deleted'
                        });
                });
            }

        }
    });
});

// @route ->-> POST api/admin/deleteAssignment/:id
// @description ->-> Delete Assignments 
// @access ->-> Public
router.post('/updateAssignment/:id', (req, res) => {
    var id = null;
    var course = {};
    Course.find({} , function(err, courses){
        if(err)
        {
            console.log(err);
            return;
        }
        else
        {
            for(var i = 0; i < courses.length; i++)
            {
                for(var j = 0; j < courses[i].assignments.length; j++)
                {
                    if(courses[i].assignments[j]._id == req.params.id)
                    {
                        courses[i].assignments.splice(j,1);
                        id = courses[i]._id;
                        assignment = new Assignment;
                        assignment.task = req.body.task;
                        assignment.day = req.body.day;
                        courses[i].assignments.push(assignment);
                        courses[i].assignments.sort((a, b) => a.day - b.day);

                        course.name = courses[i].name;
                        course.assignments = courses[i].assignments;

                        j = courses[i].assignments.length + 1;
                        i = courses.length + 1;
                        break;
                    }    
                }
            }
            var query = {_id: id};
            Course.updateOne(query, course, function(err) {
                if(err)
                    {
                        console.log(err);
                        return;
                    }
                else
                    res.render('index', {
                        title: 'Assignment Updated'
                    });
            });
        }
    });
});

module.exports = router;