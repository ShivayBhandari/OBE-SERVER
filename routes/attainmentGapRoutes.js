const attainmentGapRoutes = require("express").Router();
const { AttainmentGap } = require("./../models/attainmentGap");


attainmentGapRoutes.get('/', async(req, res) => {
    const attainmentGaps = await AttainmentGap.find();
    return res.status(200).json({ attainmentGaps: attainmentGaps }).end();
});



attainmentGapRoutes.post('/add-attainmentGap', async(req, res) => {
    const attainmentGap = new AttainmentGap({...req.body });
    attainmentGap.save((error, response) => {
        if (error) {
            return res.status(500).json({ response: null, error: error, message: "Unable To Add AttainmentGap" }).end();
        } else {
            return res.status(200).json({ response: response, error: null, message: "AttainmentGap Added Successfully" }).end();
        }
    })
});

module.exports = { attainmentGapRoutes };