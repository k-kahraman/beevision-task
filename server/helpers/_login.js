const Validator = require("validator");
const isEmpty = require("is-empty");

/**
 * Checks if users inputs to login fields are valid or not.
 * @param inputData Users input we will take this data from Front-End
 * @returns error message(s) or true if no error found.
 */
module.exports = function checkLoginInput(inputData) {
    let errorsFound = {};

    // Validator only works with String that is why I set them here.
    inputData.email = !isEmpty(inputData.email) ? inputData.email : "";
    inputData.password = !isEmpty(inputData.password) ? inputData.password : "";
    
    // Checking email
    if (Validator.isEmpty(inputData.email)) {
        errorsFound.email = "Please enter an email.";
    } else if (!Validator.isEmail(inputData.email)) {
        errorsFound.email = "Please enter a valid email. Ex. example@mail.com.";
    }

    // Checking passwords
    if (Validator.isEmpty(inputData.password)) {
        errorsFound.password = "Please enter a password.";
    }

    return {
        errors: errorsFound,
        isValid: isEmpty(errorsFound)
    };
};