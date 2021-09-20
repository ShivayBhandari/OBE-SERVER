const routes = require("express").Router();
const { StudentModel } = require("./../models/student");

routes.get("/demo", async (req, res) => {
    const data = await StudentModel.find();
    console.log(">>> Students: ", data);
    res.json(data);
})

module.exports = { routes };