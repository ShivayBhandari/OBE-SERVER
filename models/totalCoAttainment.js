const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;

const totalAttainmentSchema = new Schema({
    curriculumId: { type: String },
    curriculumName: { type: String },
    termId: { type: String },
    termName: { type: String },
    termNo: { type: Number },
    courseTitle: { type: String },
    courseCode: { type: String },
    courseId: { type: String },
},
{
    timeStamp: true,
    autoIndex : true,
    strict: false
})

totalAttainmentSchema.index("createdAt");

const FinalCoAttainment = Model("total_Co_Attainment", totalAttainmentSchema);

module.exports = {FinalCoAttainment};