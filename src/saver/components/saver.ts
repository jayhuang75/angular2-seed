/// <reference path="../../../typings/cordova.d.ts"/>
import {Component, NgZone, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {WeiFormBuilder} from '../../shared/directives/form-builder/form-builder';
import {FormBuilderService} from '../../shared/directives/form-builder/helpers/form-builder-service';
import {EmitterService} from '../../shared/directives/form-builder/helpers/emitter-service';
import * as _ from 'underscore';

@Component({
  selector: 'saver',
  directives: [WeiFormBuilder],
  providers: [FormBuilderService],
  templateUrl: './saver/components/saver.html',
  styleUrls: ['./saver/components/saver.css']
})


export class SaverCmp implements OnInit {
  filesToUpload: Array<File>;
  OCR_API: string;
  local_API: string;
  isCordovaApp: boolean;
  isLoading: boolean;
  _zone: any;
  isFirstTime: boolean;
  formList: Array<any>;
  navBarEmitter = EmitterService.get('navBarEmitter');
  income: Array<any>;
  router: Router;

  constructor(_zone : NgZone,
              private _formBuilderService: FormBuilderService,
              _router : Router
  ) {
    this.filesToUpload = [];
    this.isLoading = false;
    this._zone = _zone;
    this.income = [];
    this.router = _router;
  }

  getFormData() {
    this._formBuilderService.getFormData()
      .then((formDataList) => {
        this.formList = formDataList.forms;
        this.checkIfHaveIncomeSetting(this.formList);
      }
    );
  }

  ngOnInit() {
    this.isCordovaApp = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
    this.local_API = 'http://localhost:5000/upload';
    this.OCR_API = 'https://micro-saver-v1.herokuapp.com/upload';

    if(this.checkIfFirstLanuch()) {
      this.router.parent.navigate(['/IncomeForm']);
    }
    this.getFormData();
    this.navBarEmitter.subscribe(broadcastEvent => {
        this.formList[broadcastEvent.formID_hide].show = false;
        this.formList[broadcastEvent.formID_show].show = true;
        if (broadcastEvent.action === 'next') {
          this.income.push(broadcastEvent);
          localStorage.setItem('income', JSON.stringify(broadcastEvent));
        }
    });
  }

  checkIfFirstLanuch() {
    return (localStorage.getItem('isFirstLaunch') === null) ? true : false;
  }

  checkIfHaveIncomeSetting(listData) {
    var filter= _.where(listData, {formID: JSON.parse(localStorage.getItem('income')).formID_current});
  }

  // All this below is for the desktop
  desktopUpload() {
    this.makeFileRequest(this.OCR_API, [], this.filesToUpload).then((result) => {
      alert(JSON.stringify(result));
    }, (error) => {
      alert(error);
      console.log(error);
    });
  }

  fileChangeEvent(fileInput : any) {
    this.filesToUpload = <Array<File>> fileInput.target.files;
    console.log(this.filesToUpload);
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for(var i = 0; i < files.length; i++) {
        console.log(files[i]);
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


  // All below this is for SmartPhone
  takePhoto() {
    var options =   {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
      encodingType: 0,     // 0=JPG 1=PNG
      saveToPhotoAlbum: false
    };

    // Retrieve image file location from specified source
    navigator.camera.getPicture(
      (imageURI) => {
        var formData: any = new FormData();
        var fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);

        function blobToFile(theBlob: Blob, fileName: string): File {
          var b: any = theBlob;
          b.lastModifiedDate = new Date();
          b.name = fileName;
          return <File>theBlob;
        }

        this.isLoading = true;

        window.resolveLocalFileSystemURL(imageURI, (fileEntry:any) => {
          console.log('window resolve local : ' +  this.isLoading);
          fileEntry.file( (file) => {

            console.log('fileEntry.file : ');
            console.log(this);

            var reader = new FileReader();
            reader.onloadend = (e:any) => {

              console.log('reader.onloadend : ' + this.isLoading);

              var imgBlob = new Blob([ e.result ], { type: 'image/jpeg' } );
              var myFile = blobToFile(imgBlob, fileName);
              formData.append('upload[]', myFile, fileName);
              var xhr = new XMLHttpRequest();
              xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                    alert(JSON.stringify(xhr.response));
                    this.isLoading = false;
                  } else {
                    alert(JSON.stringify(xhr.response));
                  }
                }
              };
              xhr.open('POST', 'https://micro-saver-v1.herokuapp.com/upload', true);
              xhr.send(formData);
            };
            reader.readAsArrayBuffer(file);

          }, function(e){
            alert(e);
          });
        }, function(e){
          alert(e);
        });
      },
      function(error) {
        alert('get picture failed');
      },
      options
    );
  }
}
