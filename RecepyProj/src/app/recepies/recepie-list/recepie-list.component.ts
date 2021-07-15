import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recepie-list',
  templateUrl: './recepie-list.component.html',
  styleUrls: ['./recepie-list.component.css']
})
export class RecepieListComponent implements OnInit {
  recipes:Recipe[] = [
    new Recipe('Test recipe', "This is a test recipe!", 'https://retete.unica.ro/wp-content/uploads/2013/10/lasagna.jpg'),
    new Recipe('Test recipe', "This is a test recipe!", 'https://retete.unica.ro/wp-content/uploads/2013/10/lasagna.jpg'),
  ]
  constructor() {
  }

  ngOnInit(): void {
  }

}
