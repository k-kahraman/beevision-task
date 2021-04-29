const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * User Schema
 */
const UserSchema = new Schema({
        /**
         * Users Full Name.
         * Ex. Kaan Kahraman
         */
        name: {
            type: String,
            required: true
        },
        /**
         * Users Email.
         * This email must be a valid email
         * Ex. example@mail.com
         */
        email: {
            type: String,
            required: true
        },
        /**
         * Users Password.
         * We will hash the password when passing it to our database
         * It's length must be between min: 8 and max: 30 characters
         */
        password: {
            type: String,
            required: true
        },
        /**
         * Date when new user created
         * It is not taken from user.
         */
        creationDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        /**
         * Because we don't have a functionality like "forgot my password" or "change username"
         * This means when a new UserSchema created it will never be changed.
         * That is why I set it to false.
         */
        versionKey: false
    }
)

/**
 * This will create a new model under our database names "users"
 */
module.exports = User = mongoose.model("users", UserSchema);
