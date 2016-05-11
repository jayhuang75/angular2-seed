export class IncomeService {

  get(): Array<any> {
    return JSON.parse(localStorage.getItem('income'));
  }

  add(income): void {
    localStorage.setItem('income', JSON.stringify(income));
  }

}
