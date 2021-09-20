const express = require('express');
const morgan = require('morgan');
const cors = require("cors");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());                                    // Cross-Origin Resource Sharing (CORS) Middleware
app.use(morgan('dev'));                             // HTTP Request Logger Middleware for node.js
app.use(express.json());                            // The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.urlencoded({ extended: true }));


// Base Route
app.get("/", (req, res) => {
    res.json({
        date: new Date(),
        port: PORT,
        dirName: __dirname
    });
});

app.listen(PORT, () => console.log(`App Running On ${PORT}`))