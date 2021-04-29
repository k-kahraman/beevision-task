const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../database/config/accessKeys");

// Our input checkers
const checkRegisterInput = require("../helpers/_register");
const checkLoginInput = require("../helpers/_login");

// UserSchema to be passed
const User = require("../database/models/user");

/** 
 * 1 Year in seconds. This will be used to determine Tokens lifespan
 */ 
const yearInSeconds = 31556926

/**
 * @route POST api/users/register
 * @description Registers a new user
 * @access Public
 * req for request
 * res for response
*/
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = checkRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors); // Bad request
    }
    // Checking if the user already exists or not.
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists." }); // Bad request
        } else {
            // If user doesn't exist creating one.
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hashing the password before saving
            bcrypt.genSalt((e, salt) => {
                bcrypt.hash(newUser.password, salt, (e, hash) => {
                    if (e) throw e;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(e => console.log(`Error when hashing the password!\n${e}`));
                });
            });
        }
    });
});

/**
 * @route POST api/users/login
 * @description Login registered user
 * @access Public
 * req for request
 * res for response
*/
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = checkLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors); // Bad request
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailNotFound: "Email not found." });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: yearInSeconds // 1 year in seconds
                    },
                    // If sign in successful
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400) // Bad request
                    .json({ password: "Password incorrect." });
            }
        });
    });
});

module.exports = router;