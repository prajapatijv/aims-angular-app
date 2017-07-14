import {Component} from '@angular/core';
//import { MdTableModule } from '@angular/material';
import {DataSource} from '@angular/cdk';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/operator/startWith';
//import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector :'categories',
  styleUrls: ['categories.component.css'],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {
  dataSource: Array<CategoryModel>;

  constructor(private http:Http) {
  }

  ngOnInit() {
      this.http
        .get('http://localhost:8085/api/categories')
        .map(response => response.json())
        .subscribe(
            result => this.dataSource = result,
            error => console.log(error)
        );
    }
}


export interface CategoryModel {
  code: number;
  name: string;
}

