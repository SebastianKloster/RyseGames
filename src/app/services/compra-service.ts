import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  apiURL = "http://localhost:8080/api/juego"

  constructor(private http: HttpClient) {

  }


  comprar(id:number){
    return this.http.post(this.apiURL+"/"+id+"/comprar", null)
  }
}
