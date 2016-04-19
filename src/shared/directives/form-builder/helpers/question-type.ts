import {QuestionBase} from './question-base';

export class DropDownQuestion extends QuestionBase<string> {
  options = [];
  controlType = 'dropdown';
  constructor() {
    super();
  }
}

export class TextboxQuestion extends QuestionBase<string> {
  type:string;
  // we will overwrite this because want more details about the input
  controlType = 'textbox';
  constructor() {
    super();
  }
}
