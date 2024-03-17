interface Result {
    height : number;
    weight : number;
    bmi : string;
}

export const calculateBmi = ( h : number , w : number ) : Result => {
    const index : number =  Math.round(((w) / (Math.pow((h/100),2)))*100)/100;
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
    return {
        height : h,
        weight : w,
        bmi : result
    };
};