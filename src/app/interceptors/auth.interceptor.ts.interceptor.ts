import { HttpInterceptorFn } from '@angular/common/http';

export const AutenticacaoInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth-token');
  console.log("passou pelo interceptor");
  console.log("token: " + token);
  if (token) {
    console.log("entrou no if");
    const reqComToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(reqComToken);
  }
  return next(req);
};
