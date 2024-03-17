import { parseArguments } from './helper';

const calculateBmi = ( height : number, weight : number ) : string => {
    console.log(`Height : ${height} cm`);
    console.log(`Weight : ${weight} Kg`);
    const index : number =  Math.round(((weight) / (Math.pow((height/100),2)))*100)/100;
    let result : string; 
    switch(true){
        case (index <= 18.4): 
            result = ` Abnormal (under weight)`; 
            break;
        case (index <= 24.9): 
            result = ` Normal (healthy weight)`; 
            break; 
        case (index <= 39.9): 
            result = ` Abnormal (over weight)`; 
            break; 
        default : result = ` Abnormal (obese weight)`;
    }
    return result; 
};

try {
    const { value1 , value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1,value2[0])); 
} catch (error : unknown) {
    let errorMessage = `Something bad happened!`;
    if(error instanceof Error){
        errorMessage += ` Error : ${error.message}`; 
    }
    console.log(errorMessage);
}