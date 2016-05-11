import {Component, NgZone, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
//import * as _ from 'underscore';
import {ConfigService} from '../../shared/services/config.service';

@Component({
  selector: 'saver',
  moduleId: module.id,
  templateUrl: './saver.html',
  styleUrls: ['./saver.css'],
  providers: [ConfigService]
})

export class SaverCmp implements OnInit {
  filesToUpload: Array<File>;
  local_API: string;
  static_web_url: string;
  isCordovaApp: boolean;
  isLoading: boolean;
  _zone: any;
  router: Router;
  isUploaded: boolean = false;
  uploadSuccessMsg: string = 'You have already uploaded your file with success!';
  config: Array<any>;

  constructor(_zone : NgZone,
              _router : Router,
              private _configService: ConfigService
  ) {
    this.filesToUpload = [];
    this.isLoading = false;
    this._zone = _zone;
    this.router = _router;
  }

  ngOnInit() {
    this.isCordovaApp = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
    this._configService.getConfig().subscribe(res => {
        this.config = res;
        console.log(this.config);
        this.local_API = this.config['local_API'];
        this.static_web_url = this.config['static_web_url'];
    });
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
