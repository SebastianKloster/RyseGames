import { Injectable, signal } from '@angular/core';
import { JuegoModel } from '../model/juego';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  apiURL = "http://localhost:3000/juegos"

  private juegosData = signal<JuegoModel[]>([])

  constructor(private http: HttpClient) {
    this.http.get<JuegoModel[]>(this.apiURL).subscribe(
      data => this.juegosData.set(data)
    )
  }


  getJuegos() {
    return this.juegosData.asReadonly();
  }
}
