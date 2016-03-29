import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {AppComponent} from './app/components/app.component';
import {HTTP_BINDINGS} from 'angular2/http';
import 'rxjs/Rx';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

this.bindEvents = function () {
  document.addEventListener('deviceready', function () {
    bootstrap(AppComponent, [
      ROUTER_PROVIDERS,
      HTTP_BINDINGS,
      provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' })
    ]);
  }, false);
};

//If cordova is present, wait for it to initialize, otherwise just try to
//bootstrap the application.
this.isCordovaApp = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;


if (this.isCordovaApp) {
  this.bindEvents();
} else {
  console.log('no device');
  bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_BINDINGS,
    provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' })
  ]);
}



// In order to start the Service Worker located at "./sw.js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// if ('serviceWorker' in navigator) {
//   (<any>navigator).serviceWorker.register('./sw.js').then(function(registration) {
//     console.log('ServiceWorker registration successful with scope: ',    registration.scope);
//   }).catch(function(err) {
//     console.log('ServiceWorker registration failed: ', err);
//   });
// }
