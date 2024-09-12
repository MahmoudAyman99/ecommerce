import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  
  let _router = inject(Router)
  
  if(typeof localStorage !== "undefined"){
    if (localStorage.getItem("userToken") !== null) {
      return true;
    }
    else{
      return _router.navigate(["/login"]);
    }
  }
  else{
    return false
  }
  
};
