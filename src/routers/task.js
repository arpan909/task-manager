const express=require('express');
const Tasks=require('../model/Tasks');
const router=express.Router();



//All Tasks Route
router.get('/tasks',async (req,res)=>{
    
    try{
        const tasks=await Tasks.find({});
        res.send(tasks);
    }
    catch(e){
        res.status(500).send(e);
    }

    // Tasks.find({})
    // .then((tasks)=>{res.send(tasks)})
    // .catch((err)=>{res.status(500).send()});
});

//Specific Tasks Route
router.get('/tasks/:id', async (req,res)=>{
    const _id=req.params.id;
    try{
        const task=await Tasks.findById(_id);

        console.log(task);
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




router.post('/tasks',async (req,res)=>{
    const task = new Tasks(req.body);

    try{
       await task.save();
       res.send(task);
    }
    catch(e){
        
        res.status(400).send();
    }
    
    // tasks.save().then(()=>res.send(tasks)).catch((err)=>res.status(400).send(err));

});

router.patch('/tasks/:id',async(req,res)=>{
   
    const updates=Object.keys(req.body);
    const allowedUpdate=['desc','completed'];
    const validOperation=updates.every((update)=>allowedUpdate.includes(update));
    if(!validOperation){
        return res.status(404).send({err:"Not a valid Update!"});
    }

    try {
        
        const updated=await Tasks.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        if(!updated){
            return res.status(404).send({err:"Task Not Found!"});
        }
        res.send(updated);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/tasks/:id',async (req,res)=>{
    try {
        const deleted=await Tasks.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(404).send({msg:"No Task Found with the given ID!"});
        }
        res.send(deleted);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports=router;
