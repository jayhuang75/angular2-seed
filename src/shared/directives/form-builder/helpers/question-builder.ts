import {Component, Input, OnInit} from 'angular2/core';
import {FormBuilder, ControlGroup} from 'angular2/common';
import {EmitterService} from './emitter-service';
import {ExpenseListService} from '../../../services/expense-list.service';
import {IncomeService} from '../../../services/income.service';


@Component({
  selector : 'question-builder',
  templateUrl : './shared/directives/form-builder/helpers/question-builder.html',
  providers: [FormBuilder, IncomeService, ExpenseListService]
})

export class QuestionBuilder implements OnInit {

  @Input() model : any;
  form : ControlGroup;
  fb: FormBuilder;
  payLoad = null;
  @Input() formID : number;
  expenseListService: ExpenseListService;
  incomeService: IncomeService;
  formActionEmitter = EmitterService.get('formButtonClicked');

  constructor(fb: FormBuilder,
              expenseListService: ExpenseListService,
              _incomeService: IncomeService
  ) {
    this.fb = fb;
    this.expenseListService = expenseListService;
    this.incomeService = _incomeService;
  }

  ngOnInit() {
    this.form = <ControlGroup>this.fb.group(this.model.toGroup());
  }

  // Here we will broadcast the formID and
  //
  buttonClick(buttonFunc, thisFormID) {
    switch (buttonFunc) {
      case 'next':
            var broadcastEvent = {
              'action' : buttonFunc,
              'formID_hide' : thisFormID,
              'formID_show' : thisFormID + 1,
              'submit_data' : this.form.value
            };
            //this.formActionEmitter.emit(broadcastEvent);
            this.incomeService.add(this.form.value);

            break;
      case 'add':
            this.expenseListService.add(this.form.value);
            break;
      case 'start':
            console.log('start track');
            break;
    }
  }

}
