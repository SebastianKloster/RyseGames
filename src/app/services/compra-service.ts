import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  apiURL = "https://localhost:8443/api/juego"

  http = inject(HttpClient)


  comprar(id:number){
    return this.http.post(this.apiURL+"/"+id+"/comprar", null)
  }
}
