const mongoose =require('mongoose')
 
const urlLocal = 'mongodb://127.0.0.1:27017/stacoverflow';
//const url = "mongodb+srv://mayursorathiya107:<password>@stackdb.ubjqxdo.mongodb.net/<databaseName>?retryWrites=true&w=majority"
module.exports.connect = ()=>
{
    mongoose.connect(urlLocal)
    .then((res)=> console.log("Mongodb sujjssesful"))
    .catch((err)=>console.log('Error  dd'))
}

