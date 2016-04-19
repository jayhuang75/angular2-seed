import {ExpenseModle} from '../models/expenseModel';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

export class ExpenseListService {

  public collection$: Observable<Array<any>>;
  private _collectionObserver: any;
  private _collection: Array<any>;

  constructor () {
    this._collection = [];
    this._collectionObserver = [];
    this.collection$ = new Observable(observer => {
      this._collectionObserver = observer;
    }).share();
  }

  get(): Array<any> {
    return JSON.parse(localStorage.getItem('expenseList'));
  }

  add(newExpense): void {
    if (this.get()!== null) {
      this._collection = this.get();
    }
    this._collection.push(new ExpenseModle(newExpense.expenseType, newExpense.expense));
    localStorage.setItem('expenseList', JSON.stringify(this._collection));
    this._collectionObserver.next(this._collection);
  }

  load() {
    this._collectionObserver.next(this._collection);
  }

}
