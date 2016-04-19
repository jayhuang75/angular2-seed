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
  currentFormID: number;
  navBackClickedTrack: number;
  router: Router;

  constructor(_router: Router) {
    this.currentFormID = 0;
    this.router = _router;
  }

  ngOnInit() {
    this.formActionEmitter.subscribe(broadcastEvent => {
      this.currentFormID = broadcastEvent.formID_show;
      //this.navBarEmitter.emit(broadcastEvent);
      this.router.navigate(['/Saver']);
    });
    this.navBackClickedTrack = 0;
  }

  showLogo() {
    return this.currentFormID === 0 ? true : false;
  }

  navBack() {

    console.log('nav back clicked');

    if(this.currentFormID > 0) {
      var broadcastEvent = {
        'action' : 'previous',
        'formID_hide' : this.currentFormID,
        'formID_show' : this.currentFormID - 1
      };
      this.navBarEmitter.emit(broadcastEvent);
      this.currentFormID--;
    }
  }

}


