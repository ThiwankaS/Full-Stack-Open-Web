require('dotenv').config();
const mongoose = require('mongoose'); 

const url = process.env.MONGODB_URL;  

mongoose.set('strictQuery',false); 
mongoose.connect(url).then((result)=>{
    console.log(`connection successful!`); 
    console.log('-------------------------');
}
).catch((error)=>{
    console.log(`error connecting to DB`,error.message); 
    console.log('-------------------------');
});

const personSchema = new mongoose.Schema({ // Setting up validation rules
    name : {
        type : String,
        minLength : 3,
        required : true
    } ,
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