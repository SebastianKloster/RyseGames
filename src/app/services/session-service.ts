import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  router = inject(Router)
  http = inject(HttpClient)
  private logged$ = new BehaviorSubject<boolean>(false);
  public isLogged$ = this.logged$.asObservable();

  login(username: string, password: string) {
    const token = btoa(`${username}:${password}`);
    
    localStorage.setItem('authToken', token);

    this.http.get("http://localhost:8080/api/users/me").subscribe(
      ok => {
        this.logged$.next(true);
        this.router.navigate(['/store']);
      },
      err => {
        // Credenciales incorrectas → mostrar error
        this.logout();
        alert("Usuario o contraseña incorrectos");
      }
    );
  }

  logout() {
    localStorage.removeItem('authToken');
    this.logged$.next(false);
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders({
      'Authorization': 'Basic ' + token
    });
  }
}
