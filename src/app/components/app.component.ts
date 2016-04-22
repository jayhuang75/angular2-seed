import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {SaverCmp} from '../../saver/components/saver';
import {IncomeFormCmp} from '../../income-form/components/income-form';
import {ExpenseFormCmp} from '../../expense-form/components/expense-form';
import {WeiNavBar} from '../../shared/directives/wei-nav-bar/wei-nav-bar';

@Component({
  selector: 'sd-app',
  viewProviders: [],
  moduleId: module.id,
  templateUrl: './app.component.html',
  directives: [ROUTER_DIRECTIVES, WeiNavBar]
})

@RouteConfig([
  { path: '/', name: 'Saver', component: SaverCmp  },
  { path: '/income-form', name: 'IncomeForm', component: IncomeFormCmp  },
  { path: '/expense-form', name: 'ExpenseForm', component: ExpenseFormCmp  }
])

export class AppComponent {

}
