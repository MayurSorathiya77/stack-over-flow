const mongoose =require('mongoose')
 
const urlLocal = 'mongodb://127.0.0.1:27017/stacoverflow';
const url = "mongodb+srv://mayursorathiya107:ptlh1qThfv4TBJsn@stackdb.ubjqxdo.mongodb.net/stackoverflowclone?retryWrites=true&w=majority"
module.exports.connect = ()=>
{
    mongoose.connect(urlLocal)
    .then((res)=> console.log("Mongodb sujjssesful"))
    .catch((err)=>console.log('Error  dd'))
}

//ptlh1qThfv4TBJsn            //password
//mayursorathiya107 