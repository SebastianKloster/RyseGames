import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { UserVerDTO } from '../model/user';
@Injectable({
  providedIn: 'root',
})
export class SessionService {
router = inject(Router)
  http = inject(HttpClient)

  currentUser = signal<UserVerDTO | null>(null);

  private logged$ = new BehaviorSubject<boolean>(false);
  public isLogged$ = this.logged$.asObservable();

  private apiUsers = "http://localhost:8080/api/users";

  login(username: string, password: string) {
    const token = btoa(`${username}:${password}`);
    localStorage.setItem('authToken', token);

    this.http.get("http://localhost:8080/api/juego/1", {
      headers: { Authorization: `Basic ${token}` }
    }).subscribe(
      ok => {

        this.loadUserRole().subscribe(() => {

          const role = this.getRole();

          this.http.get<UserVerDTO[]>(this.apiUsers, {
            headers: this.getAuthHeaders()
          }).subscribe(list => {

            const user = list.find(u => u.email === username) || null;

            localStorage.setItem("loggedUser", JSON.stringify(user));
            this.currentUser.set(user);

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
    localStorage.clear();
    this.logged$.next(false);
    this.currentUser.set(null);
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders({
      'Authorization': 'Basic ' + token
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  loadUserRole(): Observable<string> {
    const token = localStorage.getItem('authToken');
    if (!token) return of("");

    const decoded = atob(token);
    const username = decoded.split(":")[0];

    return this.http.get<UserVerDTO[]>(this.apiUsers, {
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
