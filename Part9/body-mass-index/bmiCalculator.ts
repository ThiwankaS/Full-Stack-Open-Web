const calculateBmi = ( height : number, weight : number ) : string => {
    let index : number =  Math.round(((weight) / (Math.pow((height/100),2)))*100)/100;
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
}

console.log(calculateBmi(180,110)); 