import passport from "passport"


class AuthService {
    authenticate(strategy){
        if(strategy === 'local'){
            return passport.authenticate('jwt', {failWithError: true, session: false})
        }
    }
}

export const authService = new AuthService()