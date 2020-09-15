const {MongoClient,ObjectID} = require('mongodb');;

const connectionURL="mongodb://127.0.0.1:27017";
const databaseName= "task-manager";

const id=new ObjectID();
console.log(id);
console.log(id.getTimestamp());


MongoClient.connect(connectionURL,{ useUnifiedTopology: true },(err,client)=>{
    if(err){
       return console.log("Unable to connect to DB!");
    }
    const db=client.db(databaseName);

    db.collection('user').updateOne({_id:new ObjectID("5f52407d3b64d83094c872a9")},
    {
        $inc:{
            age:7
        }
    })
    .then((result)=>console.log("Update Sucessfully! ",result))
    .catch((error)=>console.log("Error!!!! ",error));


    console.log("HEllo!!");
});
