interface InputValues {
    value1 : number;
    value2 : number[];
}

export const chekValues = (arr : number[]) : boolean => {
    return arr.every(element => typeof Number(element) === 'number'); 
}


export const parseArguments = (args : string[]) : InputValues => {
    if(args.length < 4) throw new Error(`Some argument(s) missing`);
    const stringValues = [...args.slice(3)]; 
    const numericValues = stringValues.map(element => Number(element)); 
    if(!isNaN(Number(args[2])) && chekValues(numericValues)){
        return {
            value1 : Number(args[2]),
            value2 : numericValues
        }
    } else {
        throw new Error(`Provided values are not numeric values!`);
    }
}