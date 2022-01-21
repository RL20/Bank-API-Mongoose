const mongoose = require("mongoose");
const validator = require("validator");

// {"userId":1,"name":"Harel","cash":10000,"credit":2000}
const User = mongoose.model("User", {
  // userId: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  name: {
    type: String,
    required: true,
    trim: true,
  },

  cash: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },

  credit: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  //   email: {
  //     type: String,
  //     required: true,
  //     trim: true,
  //     lowercase: true,
  //     validate(value) {
  //       if (!validator.isEmail(value)) {
  //         throw new Error("Email is invalid");
  //       }
  //     },
  //   },
  //   password: {
  //     type: String,
  //     required: true,
  //     minlength: 7,
  //     trim: true,
  //     validate(value) {
  //       if (value.toLowerCase().includes("password")) {
  //         throw new Error('Password cannot contain "password"');
  //       }
  //     },
  //   },
  //   age: {
  //     type: Number,
  //     default: 0,
  //     validate(value) {
  //       if (value < 0) {
  //         throw new Error("Age must be a postive number");
  //       }
  //     },
  //   },
});

module.exports = User;
