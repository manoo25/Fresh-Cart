import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

if(localStorage.getItem('userData')){

    req=req.clone({
  setHeaders:{
    token:localStorage.getItem('userData')!
  }
})


}




  return next(req);
};
