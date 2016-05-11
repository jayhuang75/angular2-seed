import {Component, Input, OnInit} from 'angular2/core';
import {QuestionBuilder} from './helpers/question-builder';
import {QuestionModel} from './helpers/question-model';
import {DropDownQuestion, TextboxQuestion} from './helpers/question-type';
import {ExpensesList} from '../expenses-list/expenses-list';
import {IncomeList} from '../income-list/income-list';
import {ExpenseListService} from '../../services/expense-list.service';

@Component({
  selector : 'wei-form-builder',
    moduleId: module.id,
  directives: [QuestionBuilder, ExpensesList, IncomeList],
  templateUrl : './form-builder.html',
  providers: [ExpenseListService]
})

export class WeiFormBuilder implements OnInit {

  passData:Object = {};
  questionModel = new QuestionModel();
  @Input() formData:any;

  constructor (public expenseListService: ExpenseListService) {
    //console.log(expenseListService.get());
  }

  ngOnInit() {

    let inputFields = this.formData.fields;

    for (var j = 0; j < inputFields.length; j++) {
      if (inputFields[j].controlType === 'dropdown') {
        let selectList = new DropDownQuestion();
        selectList.key = inputFields[j].key;
        selectList.text = inputFields[j].text;
        let optionsList = inputFields[j].options;
        for (var k = 0; k < optionsList.length; k++) {
          selectList.options.push({
            value: optionsList[k].value,
            name: optionsList[k].name
          });
        }
        selectList.order = inputFields[j].order;
        this.questionModel.questions.push(selectList);
        this.questionModel.questions.sort((a, b) => a.order - b.order);
      } else {
        let question = new TextboxQuestion();
        question.key = inputFields[j].key;
        question.text = inputFields[j].text;
        question.required = inputFields[j].required;
        question.order = inputFields[j].order;
        question.controlType = inputFields[j].controlType;
        question.func = inputFields[j].func;
        this.questionModel.questions.push(question);
      }
    }
  }

  isExpenseForm() {
    return this.formData.formID === 'ExpenseForm' ? true : false;
  }

  isIncomeForm() {
    return this.formData.formID === 'IncomeForm' ? true : false;
  }

  showInComeData() {
    return localStorage.getItem('income') === null ? false : true;
  }

  showExpenseData() {
    return localStorage.getItem('expenseList') === null ? false : true;
  }


}
