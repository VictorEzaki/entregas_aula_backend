const HttpError = require('./../errors/HttpError');

export const errorHandlerMiddleware = (error, req, res, next) => {
    if (error instanceof HttpError) {
        res.status(error.status).json({ message: error.message })
    } else if (error instanceof Error) {
        res.status(500).json({ message: error.message })
    } else {
        res.status(500).json({ message: "Erro interno do servidor"})
    }
}