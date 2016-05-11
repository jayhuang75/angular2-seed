import {Component, NgZone, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
//import * as _ from 'underscore';

@Component({
  selector: 'saver',
  moduleId: module.id,
  templateUrl: './saver.html',
  styleUrls: ['./saver.css']
})

export class SaverCmp implements OnInit {
  filesToUpload: Array<File>;
  local_API: string = 'http://localhost:8080/upload';
  static_web_url: string = 'https://google.com';
  isCordovaApp: boolean;
  isLoading: boolean;
  _zone: any;
  router: Router;
  isUploaded: boolean = false;
  uploadSuccessMsg: string = 'You have already uploaded your file with success!';

  constructor(_zone : NgZone,
              _router : Router
  ) {
    this.filesToUpload = [];
    this.isLoading = false;
    this._zone = _zone;
    this.router = _router;
  }

  ngOnInit() {
    this.isCordovaApp = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
  }

  // All this below is for the desktop
  desktopUpload() {
    this.makeFileRequest(this.local_API, [], this.filesToUpload).then((result) => {
      this.isUploaded = true;
    }, (error) => {
      alert(error);
    });
  }

  fileChangeEvent(fileInput : any) {
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for(var i = 0; i < files.length; i++) {
        formData.append('upload[]', files[i], files[i].name);
      }
      console.log(formData);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }
  goToUrl() {
      window.location.replace(this.static_web_url);
  }
}
