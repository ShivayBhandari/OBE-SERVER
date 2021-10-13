const courseRoutes = require("express").Router();
const { Course } = require("./../models/course");

courseRoutes.get('/', async (req, res) => {
    const courses = await Course.find();
    return res.status(200).json({ courses: courses }).end();
})

module.exports = { courseRoutes };