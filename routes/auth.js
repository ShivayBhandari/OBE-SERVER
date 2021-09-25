const authRoutes = require("express").Router();
const { User } = require("./../models/user");
const bcrypt = require("bcrypt");

authRoutes.post("/login", async (req, res) => {
  let { email, password } = { ...req.body };

  let response = await User.findOne({ email: email });
  if(response != null) {
    let bcryptRes = await bcrypt.compare(password, response.password);
    if (bcryptRes) {
      res.status(200).json({ message: "User Login Successfully", user: response });
      res.end();
    } else {
      res.status(500).json({ message: "Email or Password Invalid" });
      res.end();
    }
  } else {
    res.status(500).json({ message: "User Not Found" });
    res.end()
  }
});

module.exports = { authRoutes };
