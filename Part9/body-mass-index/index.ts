/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { calculateBmi } from './bmiCal';
import { calculateExercises } from './exerciseCal';
import { chekValues } from './helper';

const app = express(); 
app.use(express.json());

app.get('/hello',(_request,response) => {

    response.send('Hello Full Stack!'); 
});

app.get('/bmi',(request,response) => {
    if(request.query.height && request.query.weight){
        const height : number = Number(request.query.height);
        const weight : number = Number(request.query.weight);

        if(isNaN(height) || isNaN(weight)){
            return response.status(400).json({  error  : " malformatted parameters " } );
        }

        const result = calculateBmi(height,weight); 
        return response.send(result);
    } else {
        return response.status(400).json({ error  : " parameters missing " } ); 
    }
});

app.post('/exercise', (request,response) => {
    const { daily_exercises,target } = request.body;
    if(!daily_exercises || !target){
        return response.status(400).send({ error : " parameters missing "});
    }
    if(isNaN(target) || !chekValues(daily_exercises)){
        return response.status(400).send({ error : " malformatted parameters "});
    }
    const result = calculateExercises(target,daily_exercises);
    return response.send(result);
});

const PORT = 3003;

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});