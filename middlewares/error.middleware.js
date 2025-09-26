const errorMiddleware = (err, req, res, next) => {
    try {
        let error = {...err};
        error.message = err.message;
        console.error(err);

        // bad objectId
        if (err.name == 'CastError') {
            const message = 'Resource Not Found';
            error = new Error(message);
            error.statusCode = 404;
        }

        // duplicate key
        if (err.code == 11000) {
            const message = 'Duplicate field value entered';
            error.message = new Error(message);
            error.statusCode = 400;
        }

        // validation error
        if (err.name == 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error.message = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(err.statusCode || 500).json({success: false, message: error.message});
    } catch(error) {
        next(error);
    }
};

export default errorMiddleware;