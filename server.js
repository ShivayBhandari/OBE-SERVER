const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { routes } = require("./routes/demo");
const { authRoutes } = require("./routes/auth");
const { userRoutes } = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors()); // Cross-Origin Resource Sharing (CORS) Middleware
app.use(morgan("dev")); // HTTP Request Logger Middleware for node.js
app.use(express.json()); // The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_PROD_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

// Base Route
app.get("/", (req, res) => {
  res.json({
    date: new Date(),
    port: PORT,
    dirName: __dirname,
  });
});

app.listen(PORT, () => console.log(`App Running On ${PORT}`));
