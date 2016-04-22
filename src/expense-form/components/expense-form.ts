import {Component} from 'angular2/core';
import {WeiFormBuilder} from '../../shared/directives/form-builder/form-builder';
import {FormBuilderService} from '../../shared/directives/form-builder/helpers/form-builder-service';
import {EmitterService} from '../../shared/directives/form-builder/helpers/emitter-service';

@Component({
    selector: 'expense-form',
  templateUrl: './expense-form/components/expense-form.html',
  directives: [WeiFormBuilder],
  providers: [FormBuilderService, EmitterService],
  styleUrls: []
})

export class ExpenseFormCmp {

}
