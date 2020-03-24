"use strict";

var express = require('express');

var router = express.Router();

var config = require('config');

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json()); // Assignment Model

var Assignment = require('../../model/Assignment');

var Course = require('../../model/Course'); // @route ->-> Get api/admin/createAssignments  
// @description ->-> Create Assignment Page
// @access ->->Public


router.get('/createAssignments', function (req, res) {
  res.render('addAssignment');
}); // @route ->-> POST api/admin/createAssignments  
// @description ->-> Put Assignments 
// @access ->->Public

router.post('/createAssignments', function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      task = _req$body.task,
      day = _req$body.day;
  Course.findOne({
    name: name
  }).then(function (course, err) {
    if (err) {
      console.log(err);
    } else if (course) {
      assignment = new Assignment();
      assignment.task = req.body.task;
      assignment.day = req.body.day;

      for (var i = 0; i < course.assignments.length; i++) {
        if (course.assignments[i].day == req.body.day) {
          course.assignments.splice(i, 1);
        }
      }

      course.assignments.push(assignment);
      course.assignments.sort(function (a, b) {
        return a.day - b.day;
      });
    } else {
      assignment = new Assignment();
      course = new Course();
      course.name = req.body.name;
      assignment.task = req.body.task;
      assignment.day = req.body.day;
      course.assignments.push(assignment);
    }

    course.save(function (err) {
      if (err) {
        console.log(err);
        return;
      } else res.render('index', {
        title: 'Assignment Added'
      });
    });
  });
  return;
}); // @route ->-> GET  api/admin/Assignments 
// @description ->-> View Assignments 
// @access ->-> Public

router.get('/Assignments', function (req, res) {
  Course.find({}, function (err, courses) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.render('viewAssignments', {
        title: 'Assignments',
        courses: courses
      });
    }
  });
});
module.exports = router;