import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel, UserUpdateDTO, UserVerDTO } from '../model/user';
import { Observable, tap } from 'rxjs';
import { SessionService } from './session-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
   private apiUrl = `${environment.api}/users`;
   session = inject(SessionService);

// usuario logueado


  private http = inject(HttpClient);

  private userState = signal<UserVerDTO[]>([]);
  private userToEditState = signal<UserUpdateDTO | null>(null);

  public users = this.userState.asReadonly();
  public userToEdit = this.userToEditState.asReadonly();

  private getUsers(){
    this.http.get<UserVerDTO[]>(this.apiUrl).subscribe(users=>{
      this.userState.set(users);
    })
  }

  constructor(){
    this.getUsers();
  }

  postUser(user: UserModel):Observable<UserVerDTO>{
    return this.http.post<UserVerDTO>(this.apiUrl, user).pipe(
      tap(newUser =>{
        this.userState.update(currentUsers =>[...currentUsers, newUser]);
      })
    )
  }

  // Eliminar usuario logueado
  delete(): Observable<void> {
    return this.http.delete<void>(this.apiUrl).pipe(
      tap(() => {
        // Opcional: quitarlo de la lista local
        const current = this.userState().find(u => u.id === this.userToEditState()?.id);
        if (current) {
          this.userState.update(users => users.filter(u => u.id !== current.id));
        }
        this.userToEditState.set(null);
      })
    );
  }
update(userUpdate: UserUpdateDTO) {
  const headers = this.getAuthHeaders();
  return this.http.put<UserVerDTO>(`${this.apiUrl}`, userUpdate, { headers }).pipe(
    tap(updatedUser => {
      this.userState.update(currentUsers =>
        currentUsers.map(user => user.id === updatedUser.id ? updatedUser : user)
      );
    })
  );
}

private getAuthHeaders() {
  const token = localStorage.getItem('authToken') || '';
  return new HttpHeaders({ 'Authorization': 'Basic ' + token });
}

  getUserById(id: number):Observable<UserVerDTO>{
    return this.http.get<UserVerDTO>(`${this.apiUrl}/${id}`);
  }

  getUserByEmail(email: string):Observable<UserVerDTO>{
    return this.http.get<UserVerDTO>(`${this.apiUrl}/getByEmail/${email}`);
  }

  selectUserToEdit(user: UserUpdateDTO | null){
    this.userToEditState.set(user);
  }

  clearUserToEdit(){
    this.userToEditState.set(null);
  }

  getLoggedUser(): UserVerDTO | null {
  const token = localStorage.getItem('authToken');
  if (!token) return null;

  const decoded = atob(token);
  const username = decoded.split(":")[0]; // email del user

  const users = this.userState();
  return users.find(u => u.email === username) || null;
}
}
