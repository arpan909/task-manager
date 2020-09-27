const express = require('express');
const User = require('./model/User');
const app= express();
require('./db/mongoose');
const taskRouter=require('./routers/task');
const userRouter=require('./routers/user');


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(3000,()=>{console.log("Server is UP!!!!!")});


// const main=async ()=>{
//     const user=await User.findById('5f6ed9256497ac33b8753475');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// } 

// main();