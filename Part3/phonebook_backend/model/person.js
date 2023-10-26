require('dotenv').config();
const mongoose = require('mongoose'); 

const url = process.env.MONGODB_URL;  

mongoose.set('strictQuery',false); 
mongoose.connect(url).then((result)=>{
    console.log(`connection successful!`); 
}
).catch((error)=>{
    console.log(`error connecting to DB`,error.message); 
});

const personSchema = mongoose.Schema({
    name    : String,
    number  : String,
}); 

personSchema.set('toJSON',{
    transform : (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id; 
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('Person',personSchema); 