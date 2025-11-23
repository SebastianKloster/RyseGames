import { inject, Injectable, signal } from '@angular/core';
import { JuegoModel } from '../model/juego';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session-service';

@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  sessionService = inject(SessionService)
  // apiURL = "http://localhost:3000/juegos"
  apiURL = "http://localhost:8080/api/juego"


  private juegosData = signal<JuegoModel[]>([])

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + token
    });


    this.http.get<JuegoModel[]>(this.apiURL, { headers }).subscribe(
      data => this.juegosData.set(data)
    )
  }


  getJuegos() {
    return this.juegosData.asReadonly();
  }
}
