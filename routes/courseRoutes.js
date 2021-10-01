const courseRoutes = require("express").Router();
const { Course } = require("./../models/course");

courseRoutes.get('/', async (req, res) => {
    const courses = await Course.find();
    
})

module.exports = { courseRoutes };