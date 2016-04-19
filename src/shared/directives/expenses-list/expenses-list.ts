import {Component, OnInit} from 'angular2/core';
import {ExpenseListService} from '../../services/expense-list.service';

@Component({
  selector : 'expenses-list',
  templateUrl : './shared/directives/expenses-list/expenses-list.html'
})

export class ExpensesList implements OnInit {

  expenseListService: ExpenseListService;
  expenseList: Array<any>;

  constructor (expenseListService: ExpenseListService) {
    this.expenseListService = expenseListService;
  }

  ngOnInit() {

    this.expenseListService.collection$.subscribe(latestCollection => {
      this.expenseList = latestCollection;
    });

    this.expenseListService.load();

    this.expenseList = this.expenseListService.get();

  }

}
