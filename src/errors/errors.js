export function newError({message, name, code}){
    const typedError = new Error(message)
    typedError.name = name
    typedError.code = code
    return typedError
}

export const ERROR_NAME = {
    INVALID_DATA: 'INVALID_DATA',
    NOT_FOUND: 'NOT_FOUND'
}


export const ERROR_TYPE = {
    NOT_FOUND: {
        code:404,
        name: ERROR_NAME.NOT_FOUND,
        message: 'recurso no encontrado'
    },
    INVALID_DATA: {
        code: 400,
        name: 'INVALID_DATA',
        message: 'datos invalidos'
    },
    INTERNAL_ERROR: {
        code: 500,
        name: 'INTERNAL_ERROR',
        message: 'internal error'
    },
}