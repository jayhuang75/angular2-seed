import {Component, OnInit} from 'angular2/core';

@Component({
  selector : 'income-list',
  templateUrl : './shared/directives/income-list/income-list.html'
})

export class IncomeList implements OnInit {

  incomeNet: number;
  otherIncome: number;

  ngOnInit() {
    var localStorageIncomeData = JSON.parse(localStorage.getItem('income'));
    this.incomeNet = localStorageIncomeData['incomeNet'];
    this.otherIncome = localStorageIncomeData['otherIncome'];
  }

}

