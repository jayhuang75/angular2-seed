import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {EmitterService} from '../form-builder/helpers/emitter-service';

@Component({
  selector : 'wei-nav-bar',
  directives: [ROUTER_DIRECTIVES],
  templateUrl : './shared/directives/wei-nav-bar/wei-nav-bar.html'
})

export class WeiNavBar implements OnInit {

  formActionEmitter = EmitterService.get('formButtonClicked');
  navBarEmitter = EmitterService.get('navBarEmitter');
  currentPage: string;
  navBackClickedTrack: number;
  router: Router;

  constructor(_router: Router) {
    this.currentPage = '';
    this.router = _router;
  }

  ngOnInit() {
    this.formActionEmitter.subscribe(broadcastEvent => {
      this.currentPage = broadcastEvent.current_page;
      //this.navBarEmitter.emit(broadcastEvent);
      this.router.navigate(['/ExpenseForm']);
    });
    this.navBackClickedTrack = 0;
  }

  showLogo() {
    console.log(this.currentPage);
    return this.currentPage === '' ? true : false;
  }

  navBack() {
    var previousPage = '/' + this.currentPage;
    this.router.navigate([previousPage]);
    return false;
  }

}


