import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { SessionService } from '../services/session.service';

export const authValidationGuard: CanActivateFn = (route, state) => {
  const service= inject(SessionService)

  const sesion=service.getCurrentSession()
  if(sesion!== null && sesion !== undefined){
    return true;
  }

  return false
};
