const errorHandler = (error,request, response, next) => {
        if(error.name === 'ValidationError'){
            return response.status(400).json({ error : error.message })
        }
        next(error);

}

module.exports = errorHandler; 

/*
const ErrorHandler = (error, request, response, next) => {
    console.error("Middleware Error Hadnling");
    if(error.name === 'ValidationError'){
        return response.status(400).json({message: 'Validation error'})
    }
    response.status(500).json({message: 'something else wrong'})
}
 */