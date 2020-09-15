const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify:false
});



// const me = new User({
//   name: "AB",
//   age: 21,
//   email:"ab@123",
//   passowrd:"password"
// });

// me.save().then(
//     (me)=>{
//         console.log("data inserted Successfully! : ",me);
//     }
// ).catch((err)=>{
//     console.log(err);
// });

// const task1 = new Task({
//   desc: "THis is the first task",
// });

// task1
//   .save()
//   .then((res) => {
//     console.log("Data Added!! ", res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
