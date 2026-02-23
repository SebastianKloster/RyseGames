import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { UserModel, UserVerDTO } from '../model/user';
import { CreateUserDTO } from '../model/createUserDTO';
import { UpdateUserDTO } from '../model/updateUserDTO';
import { AuthEvents } from '../auth/auth-events';

@Injectable({
  providedIn: 'root',
})

export class SessionService {
  router = inject(Router)
  http = inject(HttpClient)
  authEvents = inject(AuthEvents);
  apiAuthURL = "https://localhost:8443/auth";
  apiURL = "https://localhost:8443/api/users"

  user = signal<UserModel | null>(null)


  private logged$ = new BehaviorSubject<boolean>(false);
  public isLogged$ = this.logged$.asObservable();

  private loading$ = new BehaviorSubject<boolean>(true);
  isLoading$ = this.loading$.asObservable();

  private loading = signal(true);
  readonly isLoading = computed(() => this.loading());

  readonly isUserLogged = computed(() => !!this.user());

  constructor() {
    this.restoreSession();

    this.authEvents.logout$.subscribe(() => { //Deslogearse al trigerearse el evento de Logout
      this.logout();
    });
  }

  login(username: string, password: string) {
    this.http.post<{ token: string }>(
      `${this.apiAuthURL}/login`,
      { username, password }
    ).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);

        this.http.get<UserModel>(this.apiURL + "/me").subscribe({
          next: (user:UserModel) => {

            // localStorage.setItem("loggedUser", JSON.stringify(user));
            // localStorage.setItem("userRole", user.role);
            this.user.set(user);
            this.logged$.next(true);
            this.router.navigate(['/store']);
          },
          error: () => {
            this.logout();
            alert("Usuario o contraseña incorrectos");
          }
        });
      },
      error: () => {
        alert("Usuario o contraseña incorrectos");
      }
    });
  }


  logout() {
    localStorage.removeItem('token');
    // localStorage.removeItem('carrito'); //Carrito de compras

    this.user.set(null)
    this.logged$.next(false);
    this.router.navigate(['/login']);
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

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string {
    return this.user()?.role || "";
  }


  restoreSession() {
    console.log('[restoreSession] token exists?', this.isLoggedIn());
    if (!this.isLoggedIn()) {
      this.logged$.next(false);
      this.loading$.next(false);
      this.loading.set(false);
      return;
    }

    this.http.get<UserModel>(`${this.apiURL}/me`).subscribe({
      next: user => {
        this.user.set(user);
        this.logged$.next(true);
        this.loading$.next(false);
        this.loading.set(false);
      },
      error: (err) => {
        console.log('[restoreSession] /me failed status=', err.status);
        console.log('[restoreSession] ok=', err.ok);
        console.log('[restoreSession] message=', err.message);
        console.log('[restoreSession] error payload=', err.error);
        this.loading$.next(false);
        this.loading.set(false);
        this.logout();
      }
    });
  }
}

