import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { UserModel, UserUpdateDTO, UserVerDTO } from '../model/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
   private apiUrl = `${environment.api}/users`;

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


  delete (id: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(()=>{
        this.userState.update(currentUsers=>
          currentUsers.filter(user=> user.id !== id)
        )
      })
    )
  }


  update(userUpdate: UserUpdateDTO):Observable<UserVerDTO>{
    return this.http.put<UserVerDTO>(`${this.apiUrl}/${userUpdate.id}`, userUpdate).pipe(
      tap(updatedUser=>{
        this.userState.update(currentUsers=>
          currentUsers.map(user=> user.id === updatedUser.id ? updatedUser: user)
        )
      })
    )
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
}
