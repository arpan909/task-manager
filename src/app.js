const express = require('express');
const app= express();
require('./db/mongoose');
const taskRouter=require('./routers/task');
const userRouter=require('./routers/user');


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(3000,()=>{console.log("Server is UP!!!!!")});