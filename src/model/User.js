const mongoose= require('mongoose');
const validator= require('validator');

const User = mongoose.model("User", {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter a valid email address!");
        }
      },
    },
    passowrd: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
  
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Passord can not password!");
        }
      },
    },
  });
  
module.exports=User;