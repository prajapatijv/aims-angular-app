import {Component, ElementRef, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

    //http://localhost:3871/api/categories

@Component({
  selector :'categories',
  styleUrls: ['categories.component.css'],
  templateUrl: './categories.component.html'  
})
export class CategoriesComponent {
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  //exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;

  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    //this.dataSource =  new ExampleDataSource(this.exampleDatabase);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
  }
}


export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

 constructor() {
    super();
  }

  connect(): Observable<UserData[]> {
    return null;
  }
  
  disconnect() {}
}