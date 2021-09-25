const userRoutes = require("express").Router();
const { User } = require("./../models/user");
const bcrypt = require('bcrypt');

userRoutes.post("/add-user", async (req, res) => {
  let body = { ...req.body };

  let response = await User.find({ email: body.email });
  if (response.length === 0) {
    const user = new User({ ...body });
    user.password = await bcrypt.hash(body.password, 10);

    // res.status(200).json({ ...user['_doc'] })
    user.save((error, message) => {
      if (error) {
        res.status(500).json({ ...error });
        res.end();
      }
      res.status(200).json({ messgae: "User Added Successfully", res: message });
      res.end();
    });
  } else {
    res.status(500).json({
      message: "User already registered with this email address. Please use another emai.",
    });
    res.end();
  }
});

module.exports = { userRoutes };
