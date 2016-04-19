import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class FormBuilderService {

  formDataSource: string;

  constructor(public http : Http) {
    this.formDataSource = './shared/directives/form-builder/form-data/form.json';
  }

  getFormData(): Promise<any> {
    return this.http
      .get(this.formDataSource)
      .map( response => response.json())
      .toPromise();
  }


}

