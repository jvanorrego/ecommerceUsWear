import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { ADMINS } from '../../admin.config';

export const protectorGuard: CanActivateFn = (route, state) => {
  const router= inject(Router)
  const sessionService= inject(SessionService)
  const currentSession=sessionService.getCurrentSession()
  if(currentSession!== null &&currentSession!== undefined && 
    ADMINS.includes(currentSession?.email)){
    console.log(`${currentSession.email} is admin`);
    
    return true
  }else {
    router.navigateByUrl("/login")
    return false;
  }
};
