require('dotenv').config();
const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors'); 
const Person = require('./model/person') 

const app = express(); 
app.use(express.json());
app.use(express.static('dist'));
app.use(cors());

morgan.token('body', (request) => JSON.stringify(request.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));  

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]; 

const generateId = () => {
    const id = Math.floor(((Math.random() * 50 )  )+ 1 /50); 
    const exists = persons.find(person => person.id === id); 
    if(exists) {
        return generateId(); 
    } else {
        return id; 
    }
}
//get all the rcords from the DB 
app.get('/api/persons',(request,response) => {
    Person.find({}).then((record)=>{
        response.json(record);
    });
})

app.get('/info',(request,response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);  
})

app.get('/api/persons/:id',(request,response) => {
    const id = Number(request.params.id); 
    const person = persons.find(person => person.id === id); 
    if(person){
        response.json(person);
    } else {
        response.status(404).end(); 
    }
})

app.delete('/api/persons/:id',(request,response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id); 
    response.status(204).end();
})
//save record to DB 
app.post('/api/persons',(request,response) => {
    const body = request.body; 
    if (!body.name) {
        return response.status(400).json({error : `name is missing`});
    } else if (!body.number) {
        return response.status(400).json({error : `number is missing`});
    } else {
            const person = new Person(
            {
                name : body.name,
                number : body.number
            });
        person.save().then((savedRecord)=>{
            response.json(savedRecord);
        });
    }
});

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
}); 