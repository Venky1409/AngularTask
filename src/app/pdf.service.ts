import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import * as _ from "lodash";

import 'rxjs/add/operator/map';

@Injectable()
export class PdfService {
  private _configUrl = "http://127.0.0.1/api/v1" + '/pdf';  // URL to web API
  private _options = new RequestOptions({
    headers: new Headers({ 'Content-Type': 'application/json' }),
    withCredentials: true
  })

  constructor(private _http: Http) {
    this._http = _http;
  }

  getPdf(): Observable<any> {
    return this._http.get(this._configUrl,this._options).map(res => res.json());
  }

}
