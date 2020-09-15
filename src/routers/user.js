const express=require('express');
const User=require('../model/User');
const router=express.Router();



//All Users Route
router.get('/users',async (req,res)=>{

    try{
    const users=await User.find({});
    res.send(users);
    }
    catch(e){
        res.status(500).send(e);
    }

    // User.find({})
    // .then((users)=>{res.send(users)})
    // .catch((err)=>{res.status(500).send()});
});

//Unquie User Route
router.get('/users/:id', async (req,res)=>{
    
    const _id=req.params.id;
   try{
    const user=await User.findById({_id});
    
    if(!user){
       return res.status(404).send("miss");
    }
    console.log(user);
    res.send(user);
   }
   catch(e){
   
       res.status(500).send(e);
   }
   
   
   
    // console.log(_id);
    // User.findById(_id)
    // .then((user)=>{
    //     if(!user){
    //         return res.status(404).send('No result found');
    //     }
    //         res.send(user)})
    // .catch((err)=>{res.status(500).send()});
});

//POST User Route
router.post('/users',async (req,res)=>{
    const user = new User(req.body);

    try{
       await user.save();
       res.send(user);
    }
    catch(e){
        res.status(400).send(e);
    }
    // user.save().then(()=>res.send(user)).catch((err)=>res.status(400).send(err));
    
});

//User Update Route
router.patch('/users/:id',async(req,res)=>{
    const updates=Object.keys(req.body);
    const allowedUpdate=['name','passowrd','email'];
    const validOperation=updates.every((update)=>allowedUpdate.includes(update));

    if(!validOperation){
        return res.status(404).send({err:"Not a valid Update!"});

    }

    try {
        const updated= await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        if(!updated){
            return res.status(404).send();
        }
        res.send(updated);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/users/:id',async (req,res)=>{
    try {
        const deleted=await User.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(404).send({msg:"No User Found with the given ID!"});
        }
        res.send(deleted);
    } catch (error) {
        res.status(500).send();
    }
})

module.exports=router;