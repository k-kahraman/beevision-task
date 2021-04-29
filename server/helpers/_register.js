const Validator = require("validator");
const isEmpty = require("is-empty");

/**
 * This function is where we check if users input to our register form is valid or not.
 * @param inputData users input values we will take this data from Front-End
 * @returns error message(s) or true if no error found.
 */
module.exports = function checkRegisterInput(inputData) {
    let errorMessage = {}; // I'll use this Map to store errors

    // Validator only works with String that is why I set them here.
    inputData.name = !isEmpty(inputData.name) ? inputData.name : "";
    inputData.email = !isEmpty(inputData.email) ? inputData.email : "";
    inputData.password = !isEmpty(inputData.password) ? inputData.password : "";
    inputData.passwordConfirm = !isEmpty(inputData.passwordConfirm) ? inputData.passwordConfirm : "";
    
    // Checking name
    if (Validator.isEmpty(inputData.name)) {
        errorMessage.name = "Please enter your name.";
    }

    // Checking email
    if (Validator.isEmpty(inputData.email)) {
        errorMessage.email = "Please enter an email.";
    } else if (!Validator.isEmail(inputData.email)) {
        errorMessage.email = "Please enter a valid email. Ex. example@mail.com.";
    }

    // Checking password
    if (Validator.isEmpty(inputData.password)) {
        errorMessage.password = "Please enter a password.";
    }
    if (!Validator.isLength(inputData.password, { min: 8, max: 30 })) {
        errorMessage.password = "Password must be between 8 and 30 characters.";
    }

    // Checking password confirm field. This field has to be same with password.
    if (Validator.isEmpty(inputData.passwordConfirm)) {
        errorMessage.passwordConfirm = "Confirm password field can't be empty.";
    }
    if (!Validator.equals(inputData.password, inputData.passwordConfirm)) {
        errorMessage.passwordConfirm = "Passwords must match.";
    }

    return {
        errors: errorMessage,
        isValid: isEmpty(errorMessage)
    };
};