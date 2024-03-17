import express from 'express';
import { calculateBmi } from './bmiCal';

const app = express(); 

app.get('/hello',(_request,response) => {

    response.send('Hello Full Stack!'); 
});

app.get('/bmi',(request,response) => {
    if(request.query.height && request.query.weight){
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        const height : number = Number(request.query.height.toString());
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        const weight : number = Number(request.query.weight.toString());

        if(isNaN(height) || isNaN(weight)){
            return response.status(400).json({ " error " : " malformatted parameters " } );
        }

        const result = calculateBmi(height,weight); 
        return response.send(result);
    } else {
        return response.status(400).json({ " error " : " malformatted parameters " } ); 
    }
});

const PORT = 3003;

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});