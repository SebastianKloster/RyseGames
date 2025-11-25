import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { UserModel, UserVerDTO } from '../model/user';
import { CreateUserDTO } from '../model/createUserDTO';
import { UpdateUserDTO } from '../model/updateUserDTO';

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

  private isUserLogged = signal<boolean>(!!this.user)

  constructor() {
    this.logout();
  }
  
  login(username: string, password: string) {
    const token = btoa(`${username}:${password}`);
    localStorage.setItem('authToken', token);

    this.http.get(this.apiURL+"/me").subscribe(
      ok => {

        this.loadUserRole().subscribe(() => {

          const role = this.getRole();

          this.http.get<UserModel[]>(this.apiURL, {
            headers: this.getAuthHeaders()
          }).subscribe(list => {

            const user = list.find(u => u.email === username) || null;

            localStorage.setItem("loggedUser", JSON.stringify(user));
            this.user.set(user);

            this.logged$.next(true);
            this.router.navigate(['/store']);
          });
        });

      },
      err => {
        this.logout();
        alert("Usuario o contraseña incorrectos");
      }
    );
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('loggedUser');
    
    this.user.set(null)
    this.logged$.next(false);
    this.isUserLogged.set(false)
    this.router.navigate(['/login'])
  }

  postUser(user: CreateUserDTO) {
    return this.http.post<UserModel>(this.apiURL, user)
  }
  updateUser(user:UpdateUserDTO) {
    return this.http.put<UserModel>(this.apiURL, user)
  }

  getLoggedUser(){
    return this.user
  }

  isLogged() {
    return this.isUserLogged.asReadonly();
  }

    isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

   getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders({
      'Authorization': 'Basic ' + token
    });
  }

   loadUserRole(): Observable<string> {
    const token = localStorage.getItem('authToken');
    if (!token) return of("");

    const decoded = atob(token);
    const username = decoded.split(":")[0];

    return this.http.get<UserVerDTO[]>(this.apiURL, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(users => {
        const found = users.find(u => u.email === username);
        const role = found?.role || "";
        localStorage.setItem("userRole", role);
        return role;
      })
    );
  }

  getRole(): string {
    return localStorage.getItem("userRole") || "";
  }
}

