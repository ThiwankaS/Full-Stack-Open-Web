interface Result {
    success : boolean,
    target : number,
    rating : number,
    ratingDescription : string,
    periodLength : number,
    trainingDays : number,
    average : number
}

export const calculateExercises = (target : number , hours : number[] ) : Result => {
    let sum : number = 0;
    const ratingMatrix = {
        1 : ' bad ',
        2 : ' not too bad but could be better ',
        3 : ' excellent '
    };
    const summary = hours.reduce((acc,element) => {
        const { periodLenght,trainingDays } = acc;
        const newPeriodLenght = periodLenght + 1;
        const newTrainingDays = element === 0 ? trainingDays : trainingDays + 1;
        sum = sum + element; 
        const newAverage = sum / newPeriodLenght; 
        return {...acc, periodLenght : newPeriodLenght, trainingDays :  newTrainingDays, average : newAverage };
    },{
        periodLenght : 0,
        trainingDays : 0,
        average : 0
    });
        
    const success = summary.average >= target ? true : false;
    const rating = Math.round(summary.average) < target ? 1 : Math.round(summary.average) === target ? 2 : 3;
    const ratingDescription = ratingMatrix[rating];
    
    const result = {
        periodLength : summary.periodLenght,
        trainingDays : summary.trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average : summary.average
    };

    return result; 
};