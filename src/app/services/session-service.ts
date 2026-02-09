import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { UserModel } from '../model/user';
import { CreateUserDTO } from '../model/createUserDTO';
import { UpdateUserDTO } from '../model/updateUserDTO';

@Injectable({
  providedIn: 'root',
})

export class SessionService {
  router = inject(Router)
  http = inject(HttpClient)
  apiURL = "http://localhost:8080/api/users"
  authURL = "http://localhost:8080/api/auth/login"

  user = signal<UserModel | null>(null)


  private logged$ = new BehaviorSubject<boolean>(false);
  public isLogged$ = this.logged$.asObservable();

  private isUserLogged = signal<boolean>(false)
  private tokenKey = 'authToken'
  private userKey = 'loggedUser'
  private roleKey = 'userRole'

  constructor() {
    const token = this.getToken();
    const storedUser = this.getStoredUser();
    if (storedUser) {
      this.user.set(storedUser);
      this.setUserRole(storedUser.role);
    }
    this.logged$.next(!!token);
    this.isUserLogged.set(!!token)

    if (token && !storedUser) {
      this.fetchCurrentUser().subscribe({
        next: () => {
          this.logged$.next(true);
          this.isUserLogged.set(true);
        },
        error: () => {
          this.logout();
        }
      });
    }
  }
  
  login(username: string, password: string) {
    const payload = { email: username, password };
    this.http.post<{ token?: string; accessToken?: string; jwt?: string }>(this.authURL, payload).subscribe({
      next: response => {
        const token = response.token ?? response.accessToken ?? response.jwt;
        if (!token) {
          this.logout();
          alert("No se recibió un token válido.");
          return;
        }

        this.setToken(token);

        this.fetchCurrentUser().subscribe({
          next: () => {
            this.logged$.next(true);
            this.isUserLogged.set(true);
            this.router.navigate(['/store']);
          },
          error: () => {
            this.logout();
            alert("Usuario o contraseña incorrectos");
          }
        });
      },
      error: () => {
        this.logout();
        alert("Usuario o contraseña incorrectos");
      }
    });
  }

  logout() {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
    sessionStorage.removeItem(this.roleKey);
    
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
    return !!this.getToken();
  }

   getAuthHeaders(): HttpHeaders {
    const token = this.getToken() || '';
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  }

   loadUserRole(): Observable<string> {
    const storedUser = this.getStoredUser();
    if (storedUser?.role) {
      return of(storedUser.role);
    }

    return this.fetchCurrentUser().pipe(
      map(user => user?.role ?? "")
    );
  }

  getRole(): string {
    return sessionStorage.getItem(this.roleKey) || "";
  }

  private fetchCurrentUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiURL}/me`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(user => {
        if (user) {
          this.user.set(user);
          sessionStorage.setItem(this.userKey, JSON.stringify(user));
          this.setUserRole(user.role);
        }
        return user;
      })
    );
  }

  private getStoredUser(): UserModel | null {
    const raw = sessionStorage.getItem(this.userKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserModel;
    } catch {
      return null;
    }
  }

  private setToken(token: string) {
    sessionStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  private setUserRole(role: string | undefined) {
    if (!role) return;
    sessionStorage.setItem(this.roleKey, role);
  }
}
