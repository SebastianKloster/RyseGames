import { Component } from '@angular/core';
import { StoreList } from "../../components/store-list/store-list";

@Component({
  selector: 'app-store',
  imports: [StoreList],
  templateUrl: './store.html',
  styleUrl: './store.css',
})
export class Store {

}
