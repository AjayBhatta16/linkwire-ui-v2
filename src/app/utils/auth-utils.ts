import { HttpInterceptorFn } from "@angular/common/http";

export const AUTH_TOKEN_KEY = 'auth_token';
export const USERNAME_KEY = 'username';

export const authInterceptor : HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (token) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(authReq);
    }

    return next(req);
}