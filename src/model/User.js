const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Task = require("./Task");

const userSchema = new mongoose.Schema({
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
  password: {
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
  tokens: [
    {
      token: {
        type: String,
        required:true
      },
    },
  ],
}
,
{
  timestamps:true
}
);


userSchema.virtual('tasks',{
  ref:'Task',
  localField:'_id',
  foreignField:'owner'
});


userSchema.methods.generateAuthToken=async function(){

  const user=this;
  const token =jwt.sign({ _id: user._id.toString() }, 'thisisarpan');
  user.tokens=user.tokens.concat({token});
  await user.save();
  return token;
  

}
userSchema.methods.toJSON=function(){
  const user=this;
  const userObject=user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
}
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login!");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login!");
  }
  return user;
};
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.pre('remove', async function(next){
  const user=this;
  await Task.deleteMany({owner:user._id});
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
