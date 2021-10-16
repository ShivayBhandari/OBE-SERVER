const courseRoutes = require("express").Router();
const { Course } = require("./../models/course");

courseRoutes.get('/', async (req, res) => {
    const courses = await Course.find();
    return res.status(200).json({ courses: courses }).end();
});

courseRoutes.post('/add-course', (req, res) => {
    let body = { ...req.body };
    const course = new Course({ ...req.body });

    course.save((error, message) => {
        if(error) {
            return res.status(500).json({ response: null, error: error, message: "Something Went Wrong!! Please Try Again..."}).end();
        } else {
            return res.status(200).json({ response: message, error: null, message: 'Course Added Successfully' }).end();
        }
    });
});

module.exports = { courseRoutes };