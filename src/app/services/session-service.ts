import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  login(username: string, password: string) {
    const token = btoa(`${username}:${password}`);
    
    localStorage.setItem('authToken', token);
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders({
      'Authorization': 'Basic ' + token
    });
  }

  isLogged(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

}
