interface Result {
    success : boolean,
    target : number,
    rating : number,
    ratingDescription : string,
    periodLength : number,
    trainingDays : number,
    average : number
}

const calculateExercises = (target : number , hours : number[] ) : Result => {
    let sum : number = 0;
    const ratingMatrix = {
        1 : 'not up to satisfactory, need to work hard',
        2 : 'not too bad but could be better',
        3 : 'good, keep up the working'
    } 
    const summary = hours.reduce((acc,element) => {
        const { periodLenght,trainingDays,average } = acc;
        let newPeriodLenght = periodLenght + 1;
        let newTrainingDays = element === 0 ? trainingDays : trainingDays + 1;
        sum = sum + element; 
        let newAverage = sum / newPeriodLenght; 
        return {...acc, periodLenght : newPeriodLenght, trainingDays :  newTrainingDays, average : newAverage }
    },{
        periodLenght : 0,
        trainingDays : 0,
        average : 0
    })
        
    const success = summary.average >= target ? true : false;
    const rating = summary.average < 1 ? 1 : summary.average < 2 ? 2 : 3;
    const ratingDescription = ratingMatrix[rating];
    
    const result = {
        periodLength : summary.periodLenght,
        trainingDays : summary.trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average : summary.average
    }

    return result; 
}

console.log(calculateExercises(2,[3, 0, 2, 4.5, 0, 3, 1]))