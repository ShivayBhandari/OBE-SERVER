const mongoose = require("mongoose");
const { TermSchema } = require("./term");
const Schema = mongoose.Schema;
const Model = mongoose.model;

const CurriculumSchema = new Schema({
    term: { type: TermSchema }

}, {
    timestamps: true,
    autoIndex: true
});

/**
 * Curriculum Schema (Batch)
 * 
 * batchId
 * curriculumName
 * deptName
 * deptId
 * credits (total)
 * state (active/in-active) -> boolean
 * minDuration (years) -> number
 * maxDuration (years) -> number
 * totalTerms -> number
 * coursesHashcode -> string[] => term id's
 */

/**
 * Term Schema (semester)
 * 
 * _id
 * termName
 * termNumber
 * curriculumName
 * curriculumId
 * 
 */