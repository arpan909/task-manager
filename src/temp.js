// const add=(a,b)=>{

//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             if(a>1){resolve(a+b);}
//             else{
//                 reject("Error");
//             }
            
//         },2000);
//     })
    
// }

// add(2,2)
// .then(
//     (sum)=>{
//         console.log(sum);
//         return add(sum,5);
//     }
// ).then((sum)=>{console.log(sum)})
// .catch((err)=>{console.log(err);})

require("./db/mongoose");
const User=require("./model/User");
const Tasks=require("./model/Tasks");
const Task = require("./model/Tasks");


// User.findByIdAndUpdate('5f5b67b69e9b6e3f946cdffb',{age:21})
// .then((user)=>
//     {
//         console.log(user);
//         return User.countDocuments({age:21});

//     })
// .then((result)=>{console.log(result)})
// .catch((e)=>{console.log(e);})



// Tasks.findByIdAndRemove("5f5dafa26887cddec5836a9b").then((task)=>{
//     console.log(task);
//     return Task.countDocuments({completed:false});
// }).then((count)=>{console.log(count);})
// .catch((er)=>{console.log(er);})


const delTask=async (id)=>{
    const delIteam= await Tasks.findByIdAndDelete(id);
    const count = await Tasks.countDocuments({completed:false});
    return {delIteam:delIteam,count:count}
}

delTask("5f54a6443994e23888f7b538")
.then((obj)=>{
    console.log(obj);
})
.catch((e)=>{console.log(e);});