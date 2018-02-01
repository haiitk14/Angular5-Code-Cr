import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()
export class StatusService {

  constructor(private http: HttpClient) { }

  getStatusIndicator = () => {
    return IntervalObservable
      .create(3500)
      .map((i) => i);
  }

}
