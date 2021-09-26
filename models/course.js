const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;

const courseSchema = new Schema(
    {
        curriculum: {
            type: String, 
            required: true
        },
        term: {
            type: Number,
             required: true
        },
        courseDomain: {
            type: String,
             required: true
        },
        typeOfCourse: {
            type: String,
             required: true
        },
        courseCode:
        {
            type: Number,
             required: true
        },
        courseTitle:
        {
            type: String,
             required: true
        },
        courseAcronym: {
            type: String,
            required: true
        },
        theoryCredits: {
            type: Number,
             required: true,
            default: 0
        },
        tutorialCredits:
        {
            type: Number,
            required: true,
            default: 0
        },
        practicalCredits:
        {
            type: Number, 
            required: true, 
            default: 0
        },
        totalCredits:
        {
            type: Number, 
            default: 0
        },
        totalCiaWeightage:
        {
            type: Number
        },
        totalTeeWeightage:
        {
            type: Number 
        },
        totalWeightage:
        {
            type: Number 
        },
        ciaPassingMarks:
        {
            type: Number 
        },
        prerequisiteCourses:
        {
            type: String 
        },
        courseOwner:
        {
            type: String, 
            required: true
        },
        reviewerDepartment:
        {
            type: String, 
            required: true
        },
        courseReviewer:
        {
            type: String, 
            required: true
        },
        lastDateToReview:
        {
            type: Date, 
            required: true
        },
        totalCourseConatactHours:
        {
            type: Number, 
            required: true
        },
        totalCiaMarks:
        {
            type: Number, 
            required: true
        },
        totalMidTermMarks:
        {
            type: Number, 
            required: true
        },
        totalTeeMarks:
        {
            type: Number, 
            required: true
        },
        totalAttendanceMarks:
        {
            type: Number,  
            default: 0
        },
        totalMarks:
        {
            type: Number 
        },
        teeDuration:
        {
            type: Number, 
            required: true
        },
        blommsDomain:
        {
            type: String
        }
     });

     
const course = Model("courses", courseSchema);

module.exports = { course };