import {Component, OnInit} from 'angular2/core';
import {WeiFormBuilder} from '../../shared/directives/form-builder/form-builder';
import {FormBuilderService} from '../../shared/directives/form-builder/helpers/form-builder-service';
import {EmitterService} from '../../shared/directives/form-builder/helpers/emitter-service';

@Component({
  selector: 'income-form',
  templateUrl: './income-form/components/income-form.html',
  directives: [WeiFormBuilder],
  providers: [FormBuilderService, EmitterService],
  styleUrls: []
})

export class IncomeFormCmp implements OnInit {

  incomeForm: Array<any>;

  constructor (private _formBuilderService: FormBuilderService) {

  }

  getFormData() {
    this._formBuilderService.getFormData()
      .then((formDataList) => {
        this.incomeForm = formDataList.forms[0];
        console.log(this.incomeForm);
      }
    );
  }

  ngOnInit() {
      this.getFormData();
  }



}
