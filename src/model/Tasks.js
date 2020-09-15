const mongoose=require('mongoose');

const Tasks = mongoose.model("Tasks", {
    desc: {
      type: String,
      trim: true,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  });

  module.exports=Tasks;