const express=require('express');
const auth = require('../middleware/auth');
const User=require('../model/User');
const router=express.Router();



//All Users Route
router.get('/users/me',auth,async (req,res)=>{

    res.send(req.user);
    // User.find({})    
    // .then((users)=>{res.send(users)})
    // .catch((err)=>{res.status(500).send()});
});


router.post('/users/logout',auth, async (req,res)=>{
    try {
        req.user.tokens=req.user.tokens.filter((token)=>
        { 
            return token.token!==req.token;
        });
        await req.user.save();
        res.send("logout");
    } catch (error) {
        res.status(500).send(); 
    } 
})

router.post('/users/logoutAll',auth,async (req,res)=>{
    try {
        req.user.tokens=[];
        await req.user.save();
        res.send("logout from all");
    } catch (error) {
        res.status(500).send();
    }
})

router.get('/users/login',async (req,res)=>{
    try {
        const user=await User.findByCredentials(req.body.email,req.body.password);
        const token= await user.generateAuthToken();

        res.send({user,token});

    } catch (error) {
        res.status(500).send();
        
    }
});

//Unquie User Route
// router.get('/users/:id', async (req,res)=>{
    
//     const _id=req.params.id;
//    try{
//     const user=await User.findById({_id});
    
//     if(!user){
//        return res.status(404).send("miss");
//     }
//     console.log(user);
//     res.send(user);
//    }
//    catch(e){
   
//        res.status(500).send(e);
//    }
   
   
   
    // console.log(_id);
    // User.findById(_id)
    // .then((user)=>{
    //     if(!user){
    //         return res.status(404).send('No result found');
    //     }
    //         res.send(user)})
    // .catch((err)=>{res.status(500).send()});
// });

//POST User Route
router.post('/users',async (req,res)=>{
    const user = new User(req.body);
    

    try{
        const token=await user.generateAuthToken();

      

       res.send({user,token});
    }
    catch(e){
        res.status(400).send(e);
    }
    // user.save().then(()=>res.send(user)).catch((err)=>res.status(400).send(err));
    
});

//User Update Route
router.patch('/users/me',auth,async(req,res)=>{
    const updates=Object.keys(req.body);
    const allowedUpdate=['name','password','email','age'];
    const validOperation=updates.every((update)=>allowedUpdate.includes(update));

    if(!validOperation){
        return res.status(404).send({err:"Not a valid Update!"});

    }

    try {
        //const updatedUser= await User.findById(req.params.id);
        updates.forEach((update)=>req.user[update]=req.body[update]);
        await req.user.save();
        //const updated= await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/users/me',auth,async (req,res)=>{
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    }
})

module.exports=router;