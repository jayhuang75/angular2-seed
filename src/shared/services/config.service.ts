import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ConfigService {

    constructor(private _http: Http) { }
    getConfig() {
        return this._http.get('../../configs/configs.json')
            .map( response => response.json())
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }

}
