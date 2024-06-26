import {config} from 'dotenv'

export const NODE_ENV = process.env.NODE_ENV || 'development'
if (NODE_ENV === 'development'){
  config()
}

export const IPINFO = 'ipinfo'
export const MAXMIND = 'maxmind'

export const PORT = process.env.PORT || 8080

export const BASE_URL = NODE_ENV === "production" ? 'https://chfinalproject16mailing.onrender.com/' : 'http:localhost:8080/'

export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR;

export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || ''
export const COOKIE_SECRET = process.env.COOKIE_SECRET || ''

export const ADMIN_EMAIL = 'adminCoder@coder.com'
export const GITHUB_APP_ID = 783915
export const GITHUB_CLIENT_ID = 'Iv1.03ebfa74d8919e54'
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
export const GITHUB_CALLBACK_URL = 'http://localhost:8080/githubcallback'


export const COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: 1000*60*60*24,
    signed: true,
    secure: true,
    path: '/',
    domain: NODE_ENV === "production" ? 'chfinalproject16mailing.onrender.com' : 'localhost',
    expires: new Date(1), 
}

export const DEFAULT_USER_AVATAR_PATH = './static/imgs/default-user.webp'
export const MODO_EJECUCION = 'online'
export const IP_LOCATION_PROIVIDER = IPINFO

export const loggerLevel = {
  CONSOLE: NODE_ENV === 'production' ? 'info' : 'debug',
  FILE: 'error'
}

export const logLevels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  };

export const loggerFile =  './logs/errors.log'

export const NODEMAILER_GMAIL_OPTIONS = {
    service: 'gmail',
    port: '587',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
}