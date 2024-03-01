import 'dotenv/config'
// export const MONGODB_CNX_STR = 'mongodb://localhost/ecommerce';
export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR;
export const PORT = process.env.PORT
// export const SESSION_SECRET = 'SecretCoder'
export const ADMIN_EMAIL = 'adminCoder@coder.com'
export const GITHUB_APP_ID = 783915
export const GITHUB_CLIENT_ID = 'Iv1.03ebfa74d8919e54'
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
export const GITHUB_CALLBACK_URL = 'http://localhost:8080/githubcallback'
export const COOKIE_SECRET = process.env.COOKIE_SECRET
export const COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: 1000*60*60*24,
    signed: true,
    path: '/',
    domain: 'localhost',
    expires: new Date(1), 
}
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
export const DEFAULT_USER_AVATAR_PATH = './static/imgs/default-user.webp'
export const MODO_EJECUCION = 'online'
// export const MODO_EJECUCION = 'offline'