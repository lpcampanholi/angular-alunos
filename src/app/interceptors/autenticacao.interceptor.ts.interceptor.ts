import { HttpInterceptorFn } from '@angular/common/http';

export const AutenticacaoInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth-token');
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
