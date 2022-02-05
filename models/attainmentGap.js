const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;


const attainmentGapSchema = new Schema({

    curriculumId: { type: String },
    curriculumName: { type: String },
    termId: { type: String },
    termName: { type: String },
    termNo: { type: Number },
    courseTitle: { type: String },
    courseCode: { type: String },
    courseId: { type: String },
}, {
    timestamps: true,
    autoIndex: true,
    strict: false
})

const AttainmentGap = Model("attainmentGap", attainmentGapSchema);

module.exports = { AttainmentGap, attainmentGapSchema };