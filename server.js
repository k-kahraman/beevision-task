const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./server/api/users");

/**
 * Creating or server app called App.
 * This is also our agent.
 */
const App = express();

/**
 * BodyParser's middleware
 */
App.use(
    bodyParser.urlencoded({
        extended: false
    })
);
App.use(bodyParser.json());

/**
 * Import Database Access Key
 */
const dbURI = require("./server/database/config/accessKeys").uri;

/**
 * Connecting to database in this case MongoDB
 */
mongoose.connect(
    dbURI,
    {
        useNewUrlParser: true, // Using url parse
        useUnifiedTopology: true // Using new server discover and monitoring engine for better performance
    } 
    ).then(() => console.log("Connected to Database!"))
    .catch(e => console.log(`Error when trying to connect database!\n${e}`)
);

/**
 * Passport middleware
 */ 
App.use(passport.initialize());

/** 
 * Passport config
 */ 
require("./server/api/config/passport")(passport);

/**
 * Routes
 */
App.use("/api/users", users);

const port = 8000; // Custom Port

/**
 * Server listening our port
 */
App.listen(port, () => console.log(`Server up and running on port ${port}`))