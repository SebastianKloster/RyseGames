import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  router = inject(Router)
  http = inject(HttpClient)
  apiURL = "http://localhost:8080/api/users"

  user = signal<UserModel | null>(null)


  private logged$ = new BehaviorSubject<boolean>(false);
  public isLogged$ = this.logged$.asObservable();

  login(username: string, password: string) {
    const token = btoa(`${username}:${password}`);
    
    localStorage.setItem('authToken', token);

    this.http.get<UserModel>(this.apiURL+"/me").subscribe(
      data => {

        //asigno la data que llega a User
        this.user.set(data);

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
    this.user.set(null)
    this.logged$.next(false);
  }

  getLoggedUser(){
    return this.user
  }
}
