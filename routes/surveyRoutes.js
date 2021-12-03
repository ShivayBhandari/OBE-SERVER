const surveyRoutes = require("express").Router();
const { Survey } = require("./../models/survey");
const json = require("./../json/survey.json");

surveyRoutes.get("/", async (req, res) => {
    const surveys = await Survey.find();
    return res.status(200).json({ surveys: surveys }).end();
});

surveyRoutes.post("/add-survey", async (req, res) => {
    const { response } = { ...req.body };
    // console.log(json.response);
    Survey.insertMany(JSON.parse(response))
    .then((value) => {
        return res.status(200).json({ response: value, error: null, message: 'Students Survey Response Imported Successfully' }).end();
    })
    .catch((error) => {
        console.log(error);
        return res.status(500).json({ response: null, error: error, message: "Something Went Wrong!! Please Try Again..." }).end();
    });
})

module.exports = { surveyRoutes };