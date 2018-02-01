/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse, 
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

import { StartCalcul } from '../models/start-calcul';
import { ViewBrainOptim } from '../models/view-brain-optim';
import { ViewProgressBar } from '../models/view-progress-bar';
import { StartCalculate } from '../models/start-calculate';
import { OptimumCalculator } from '../models/optimum-calculator';


@Injectable()
export class CalculatorService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Run Kernal Brain Calcul
   * @param body - body save start Calcul
   */
  startCalculResponse(body: StartCalcul): Observable<HttpResponse<number[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/calculator/startcalcul`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: number[] = null;
        _body = _resp.body as number[]
        return _resp.clone({body: _body}) as HttpResponse<number[]>;
      })
    );
  }

  /**
   * Run Kernal Brain Calcul
   * @param body - body save start Calcul
   */
  startCalcul(body: StartCalcul): Observable<number[]> {
    return this.startCalculResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * save Calcul Optim
   * @param body - body save start Calcul
   */
  calculOptimResponse(body: StartCalcul): Observable<HttpResponse<number[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/calculator/calculoptim`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: number[] = null;
        _body = _resp.body as number[]
        return _resp.clone({body: _body}) as HttpResponse<number[]>;
      })
    );
  }

  /**
   * save Calcul Optim
   * @param body - body save start Calcul
   */
  calculOptim(body: StartCalcul): Observable<number[]> {
    return this.calculOptimResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get brain optim
   * @param idStudyEquipment - undefined
   * @param brainoptim - undefined
   */
  getBrainOptimResponse(params: CalculatorService.GetBrainOptimParams): Observable<HttpResponse<ViewBrainOptim>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idStudyEquipment != null) __params = __params.set("idStudyEquipment", params.idStudyEquipment.toString());
    if (params.brainoptim != null) __params = __params.set("brainoptim", params.brainoptim.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/calculator/brainoptim`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: ViewBrainOptim = null;
        _body = _resp.body as ViewBrainOptim
        return _resp.clone({body: _body}) as HttpResponse<ViewBrainOptim>;
      })
    );
  }

  /**
   * get brain optim
   * @param idStudyEquipment - undefined
   * @param brainoptim - undefined
   */
  getBrainOptim(params: CalculatorService.GetBrainOptimParams): Observable<ViewBrainOptim> {
    return this.getBrainOptimResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Run Kernal Calcul Optim
   * @param body - body run start Calcul optim
   */
  startCalculOptimResponse(body: ViewBrainOptim): Observable<HttpResponse<number[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/calculator/startcalculoptim`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: number[] = null;
        _body = _resp.body as number[]
        return _resp.clone({body: _body}) as HttpResponse<number[]>;
      })
    );
  }

  /**
   * Run Kernal Calcul Optim
   * @param body - body run start Calcul optim
   */
  startCalculOptim(body: ViewBrainOptim): Observable<number[]> {
    return this.startCalculOptimResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get study equipment
   * @param idStudy - undefined
   */
  getProgressBarStudyEquipmentResponse(idStudy?: number): Observable<HttpResponse<ViewProgressBar>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idStudy != null) __params = __params.set("idStudy", idStudy.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/calculator/progressbar`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: ViewProgressBar = null;
        _body = _resp.body as ViewProgressBar
        return _resp.clone({body: _body}) as HttpResponse<ViewProgressBar>;
      })
    );
  }

  /**
   * get study equipment
   * @param idStudy - undefined
   */
  getProgressBarStudyEquipment(idStudy?: number): Observable<ViewProgressBar> {
    return this.getProgressBarStudyEquipmentResponse(idStudy).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Run Kernal calculate
   * @param body - body save startCalculate
   */
  startCalculateResponse(body: StartCalculate): Observable<HttpResponse<number[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/calculator/startcalculate`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: number[] = null;
        _body = _resp.body as number[]
        return _resp.clone({body: _body}) as HttpResponse<number[]>;
      })
    );
  }

  /**
   * Run Kernal calculate
   * @param body - body save startCalculate
   */
  startCalculate(body: StartCalculate): Observable<number[]> {
    return this.startCalculateResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get optimumcalculator
   * @param idStudyEquipment - undefined
   * @param idStudy - undefined
   */
  getOptimumCalculatorResponse(params: CalculatorService.GetOptimumCalculatorParams): Observable<HttpResponse<OptimumCalculator>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idStudyEquipment != null) __params = __params.set("idStudyEquipment", params.idStudyEquipment.toString());
    if (params.idStudy != null) __params = __params.set("idStudy", params.idStudy.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/calculator/optimumcalculator`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: OptimumCalculator = null;
        _body = _resp.body as OptimumCalculator
        return _resp.clone({body: _body}) as HttpResponse<OptimumCalculator>;
      })
    );
  }

  /**
   * get optimumcalculator
   * @param idStudyEquipment - undefined
   * @param idStudy - undefined
   */
  getOptimumCalculator(params: CalculatorService.GetOptimumCalculatorParams): Observable<OptimumCalculator> {
    return this.getOptimumCalculatorResponse(params).pipe(
      map(_r => _r.body)
    );
  }}

export module CalculatorService {
  export interface GetBrainOptimParams {
    idStudyEquipment?: number;
    brainoptim?: number;
  }
  export interface GetOptimumCalculatorParams {
    idStudyEquipment?: number;
    idStudy?: number;
  }
}
