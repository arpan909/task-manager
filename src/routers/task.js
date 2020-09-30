const express=require('express');
const auth = require('../middleware/auth');
const Task = require('../model/Task');
const router=express.Router();



//All Tasks Route
//GET /tasks/?completed=true
//GET /tasks/?limit=3&skip=2
//GET /tasks/?sortBy=createdAt:desc
router.get('/tasks',auth,async (req,res)=>{

    const match={}
    const sort={}

    if(req.query.sortBy){
        const parts=req.query.sortBy.split(':');
        sort[parts[0]]= parts[1]==='desc'?-1:1;
    }

    if(req.query.completed){
        match.completed= req.query.completed === 'true';
    }

    try{
        // const tasks=await Task.find({owner:req.user._id});
        await req.user.populate(
            {
                path:'tasks',
                match,
                options:{
                     limit: parseInt(req.query.limit),
                     skip: parseInt(req.query.skip),
                     sort
                 }
         }).execPopulate();
        res.send(req.user.tasks);
        
    }
    catch(e){
        res.status(500).send(e);
    }

    // Tasks.find({})
    // .then((tasks)=>{res.send(tasks)})
    // .catch((err)=>{res.status(500).send()});
});

//Specific Tasks Route
router.get('/tasks/:id', auth ,async (req,res)=>{
    const _id=req.params.id;
    try{
        const task=await Task.findOne({_id,owner:req.user._id});    
        
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
       
        
    }
    catch(e){
        
        res.status(500).send(e);
    }


    


    // Tasks.findById(_id)
    // .then((task)=>{
    //     console.log(task);
    //     if(!task){
    //         return res.status(404).send('No result found');
    //     }
    //     res.send(task)})
    // .then((rr)=>{res.send(rr)}).catch((err)=>{
    //     res.status(500).send()});
});




router.post('/tasks',auth,async (req,res)=>{
    //const task = new Tasks(req.body);
    const task=new Task({
        ...req.body,
        owner:req.user._id
    });
    try{
       await task.save();
       res.send(task);
    }
    catch(e){
        
        res.status(400).send();
    }
    
    // tasks.save().then(()=>res.send(tasks)).catch((err)=>res.status(400).send(err));

});

router.patch('/tasks/:id', auth ,async(req,res)=>{
   
    const updates=Object.keys(req.body);
    const allowedUpdate=['desc','completed'];
    const validOperation=updates.every((update)=>allowedUpdate.includes(update));
    if(!validOperation){
        return res.status(404).send({err:"Not a valid Update!"});
    }

    try {
        
        //const updated=await Tasks.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        // const updatedTask=await Task.findById(req.params.id);

        const updatedTask=await Task.findOne({_id:req.params.id, owner:req.user._id});

        
        if(!updatedTask){
            return res.status(404).send({err:"Task Not Found!"});
        }
        
        updates.forEach((update)=>updatedTask[update]=req.body[update]);
        await updatedTask.save();
        res.send(updatedTask);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/tasks/:id', auth ,async (req,res)=>{
    try {
        const deleted=await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if(!deleted){
            return res.status(404).send({msg:"No Task Found with the given ID!"});
        }
        res.send(deleted);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports=router;
