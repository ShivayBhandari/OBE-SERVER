const attainmentRoutes = require("express").Router();
const { StudentAttainment } = require("./../models/attainment");

attainmentRoutes.get('/:courseId', async (req, res) => {
  const attainment = await StudentAttainment.find({ 
    'courseId': req.params.courseId
  });
  return res.status(200).json({ attainments: attainment }).end();
});

attainmentRoutes.post('/add-student-attainment', async (req, res) => {
  const { data } = { ...req.body };
  StudentAttainment.insertMany([ ...data ]) 
    .then((response) => {
      return res.status(200).json({ response: response, error: null, message: 'Student Marks Imported Successfully' }).end();
    })
    .catch((error) => {
      return res.status(500).json({ response: null, error: error, message: "Something Went Wrong!! Please Try Again..." }).end();
    })
  
  // return res.status(200).json({ date: new Date() }).end();
});

module.exports = { attainmentRoutes }