import { Injectable, inject } from '@angular/core';
import { Session } from '../models/session.model';
import { AuthService } from '../../modules/login/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  authService= inject(AuthService)
  constructor() { }

  getCurrentSession(): Session| undefined | null {
    const sessionData = localStorage.getItem('user');
    if (sessionData) {
      return JSON.parse(sessionData) as Session;
    }
    return null;
  }

  closeSession(): void {
    localStorage.removeItem('user');
    this.authService.logout()
  }
}
