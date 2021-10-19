const courseCORoutes = require("express").Router();
const { CourseCO } = require("./../models/course-co");

courseCORoutes.get('/', async (req, res) => {
  const coursesCO = await CourseCO.find();
  return res.status(200).json({ coursesCO: coursesCO }).end();
});

courseCORoutes.post('/add-co', async (req, res) => {
  const courseCO = new CourseCO({ ...req.body });

  courseCO.save((error, message) => {
    if (error) {
      return res.status(500).json({ response: null, error: error, message: "Something Went Wrong!! Please Try Again..." }).end();
    } else {
      return res.status(200).json({ response: message, error: null, message: 'Course Outcome Added Successfully' }).end();
    }
  });
});

courseCORoutes.delete("/delete/:co_Id", (req, res) => {
  CourseCO.findByIdAndDelete(req.params.co_Id, (err, msg) => {
      if(err) {
          return res.status(500).json({ ...err, message: "Something Went Wrong!!" }).end();
      } else {
          return res.status(200).json({ date: new Date(), message: "Course Outcome Delete successfully" }).end();
      }
  })
});

module.exports = { courseCORoutes };