import { ERROR_NAME, ERROR_TYPE } from '../errors/errors.js'

export function manejoDeErrores(error, req, res, next) {
  switch (error.name) {
    case ERROR_NAME.INVALID_DATA:
      res.status(ERROR_TYPE.INVALID_DATA.code)
      break
    case ERROR_NAME.NOT_FOUND:
      res.status(ERROR_TYPE.NOT_FOUND.code)
      break
    case ERROR_NAME.INTERNAL_ERROR:
      res.status(ERROR_TYPE.INTERNAL_ERROR.code)
    break  
    default:
      res.status(500)
  }
  res.json({
    status: 'error',
    type: error.name,
    message: error.message
  })
}