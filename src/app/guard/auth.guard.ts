import { CanActivateFn ,Router } from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router =inject(Router)
  const loggedData = localStorage.getItem("user")
  if(loggedData !==null){
    return true;
  }
  else{
    router.navigateByUrl("login")
    return false;
  }
};
