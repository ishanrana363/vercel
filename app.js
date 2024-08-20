const express = require('express');
const app = express();
const expressMongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const hpp = require('hpp');
const courseModel = require("./src/models/courseModel")

// express-mongo-sanitize use to user-supplied data to prevent MongoDB Operator Injection.
app.use(expressMongoSanitize());

// Using cors enable CORS with various options.

app.use(cors());

// hpp protect against HTTP Parameter Pollution attacks

app.use(hpp());

// Apply the rate limiting middleware to all requests.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:5000",
      ],
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );


const publicRoute = require("./src/routes/publicRoutes");
const privateRoute = require("./src/routes/privateRoute");

app.get("/", (req, res) => {
    res.send("lms server");
})


//  Public routes

app.use("/api/v1",publicRoute);

// Private Routes

app.use("/api/v1",privateRoute);




module.exports = app;
