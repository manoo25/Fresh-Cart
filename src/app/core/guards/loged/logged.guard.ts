import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const _router=inject(Router)
  if(localStorage.getItem('userData')!==null){
    _router.navigate(['/home']);
   return false;
  }
  else{ 
   
   return true
  
  }
};
