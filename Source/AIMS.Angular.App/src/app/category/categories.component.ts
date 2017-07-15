import {Component, ElementRef, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector :'categories',
  styleUrls: ['categories.component.css'],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {
  displayedColumns = ['code','name'];
  dataSource: CategoryDataSource | null;

  constructor(private http:Http) {
  }

  ngOnInit() {
      this.http
        .get('http://localhost:8085/api/categories')
        .map(response => response.json())
        .subscribe(
            result => this.dataSource = new CategoryDataSource(new CategoryDatabase(result)),
            error => console.log(error)
        );
    }
}

export interface CategoryModel {
  code: number;
  name: string;
}

export class CategoryDatabase {
   dataChange: BehaviorSubject<CategoryModel[]> = new BehaviorSubject<CategoryModel[]>([]);
   get data() : CategoryModel[] { return this.dataChange.value; }

   constructor(items) {
      items.forEach(item => {
        const copiedData = this.data.slice();
        copiedData.push(item);        
        this.dataChange.next(copiedData);
      });
   }
}

export class CategoryDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: CategoryDatabase) {
    super();
  }

   /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<CategoryModel[]> {
    return this._exampleDatabase.dataChange;
  }

  disconnect() {} 
}