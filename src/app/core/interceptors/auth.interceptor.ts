import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    console.log("Auth Interceptor Called!!!!");
    return next(req);
};
