import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {SaverCmp} from '../../saver/components/saver';

@Component({
  selector: 'sd-app',
  viewProviders: [],
  moduleId: module.id,
  templateUrl: './app.component.html',
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  { path: '/', name: 'Saver', component: SaverCmp  }
])

export class AppComponent {

}
