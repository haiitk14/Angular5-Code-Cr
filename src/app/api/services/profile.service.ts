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

import { ChangePassword } from '../models/change-password';
import { Translation } from '../models/translation';
import { Constructors } from '../models/constructors';
import { MonetaryCurrency } from '../models/monetary-currency';
import { Units } from '../models/units';
import { Profile } from '../models/profile';


@Injectable()
export class ProfileService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Change password
   * @param id - undefined
   * @param body - body password
   */
  changePasswordResponse(params: ProfileService.ChangePasswordParams): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    __body = params.body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/users/${params.id}/changepassword`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: number = null;
        _body = parseFloat(_resp.body as string)
        return _resp.clone({body: _body}) as HttpResponse<number>;
      })
    );
  }

  /**
   * Change password
   * @param id - undefined
   * @param body - body password
   */
  changePassword(params: ProfileService.ChangePasswordParams): Observable<number> {
    return this.changePasswordResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get list Energies
   */
  getEnergiesResponse(): Observable<HttpResponse<Translation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/users/energies`,
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
        let _body: Translation = null;
        _body = _resp.body as Translation
        return _resp.clone({body: _body}) as HttpResponse<Translation>;
      })
    );
  }

  /**
   * get list Energies
   */
  getEnergies(): Observable<Translation> {
    return this.getEnergiesResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get list Constructors
   * @param idCooling - undefined
   */
  getConstructorsResponse(idCooling?: number): Observable<HttpResponse<Constructors>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCooling != null) __params = __params.set("idCooling", idCooling.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/users/constructors`,
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
        let _body: Constructors = null;
        _body = _resp.body as Constructors
        return _resp.clone({body: _body}) as HttpResponse<Constructors>;
      })
    );
  }

  /**
   * get list Constructors
   * @param idCooling - undefined
   */
  getConstructors(idCooling?: number): Observable<Constructors> {
    return this.getConstructorsResponse(idCooling).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get list family (equipment series)
   * @param manufacturerLabel - undefined
   * @param idCooling - undefined
   */
  getFamiliesResponse(params: ProfileService.GetFamiliesParams): Observable<HttpResponse<Translation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.manufacturerLabel != null) __params = __params.set("manufacturerLabel", params.manufacturerLabel.toString());
    if (params.idCooling != null) __params = __params.set("idCooling", params.idCooling.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/users/families`,
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
        let _body: Translation = null;
        _body = _resp.body as Translation
        return _resp.clone({body: _body}) as HttpResponse<Translation>;
      })
    );
  }

  /**
   * get list family (equipment series)
   * @param manufacturerLabel - undefined
   * @param idCooling - undefined
   */
  getFamilies(params: ProfileService.GetFamiliesParams): Observable<Translation> {
    return this.getFamiliesResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get list Origines (equipment Origines)
   * @param manufacturerLabel - undefined
   * @param idFamily - undefined
   * @param idCooling - undefined
   */
  getOriginesResponse(params: ProfileService.GetOriginesParams): Observable<HttpResponse<Translation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.manufacturerLabel != null) __params = __params.set("manufacturerLabel", params.manufacturerLabel.toString());
    if (params.idFamily != null) __params = __params.set("idFamily", params.idFamily.toString());
    if (params.idCooling != null) __params = __params.set("idCooling", params.idCooling.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/users/origines`,
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
        let _body: Translation = null;
        _body = _resp.body as Translation
        return _resp.clone({body: _body}) as HttpResponse<Translation>;
      })
    );
  }

  /**
   * get list Origines (equipment Origines)
   * @param manufacturerLabel - undefined
   * @param idFamily - undefined
   * @param idCooling - undefined
   */
  getOrigines(params: ProfileService.GetOriginesParams): Observable<Translation> {
    return this.getOriginesResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get list Processes (Processes type)
   * @param manufacturerLabel - undefined
   * @param idStd - undefined
   * @param idFamily - undefined
   * @param idCooling - undefined
   */
  getProcessesResponse(params: ProfileService.GetProcessesParams): Observable<HttpResponse<Translation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.manufacturerLabel != null) __params = __params.set("manufacturerLabel", params.manufacturerLabel.toString());
    if (params.idStd != null) __params = __params.set("idStd", params.idStd.toString());
    if (params.idFamily != null) __params = __params.set("idFamily", params.idFamily.toString());
    if (params.idCooling != null) __params = __params.set("idCooling", params.idCooling.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/users/processes`,
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
        let _body: Translation = null;
        _body = _resp.body as Translation
        return _resp.clone({body: _body}) as HttpResponse<Translation>;
      })
    );
  }

  /**
   * get list Processes (Processes type)
   * @param manufacturerLabel - undefined
   * @param idStd - undefined
   * @param idFamily - undefined
   * @param idCooling - undefined
   */
  getProcesses(params: ProfileService.GetProcessesParams): Observable<Translation> {
    return this.getProcessesResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get list Processes (Processes type)
   * @param manufacturerLabel - undefined
   * @param idStd - undefined
   * @param idProcess - undefined
   * @param idFamily - undefined
   * @param idCooling - undefined
   */
  getModelsResponse(params: ProfileService.GetModelsParams): Observable<HttpResponse<Translation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.manufacturerLabel != null) __params = __params.set("manufacturerLabel", params.manufacturerLabel.toString());
    if (params.idStd != null) __params = __params.set("idStd", params.idStd.toString());
    if (params.idProcess != null) __params = __params.set("idProcess", params.idProcess.toString());
    if (params.idFamily != null) __params = __params.set("idFamily", params.idFamily.toString());
    if (params.idCooling != null) __params = __params.set("idCooling", params.idCooling.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/users/models`,
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
        let _body: Translation = null;
        _body = _resp.body as Translation
        return _resp.clone({body: _body}) as HttpResponse<Translation>;
      })
    );
  }

  /**
   * get list Processes (Processes type)
   * @param manufacturerLabel - undefined
   * @param idStd - undefined
   * @param idProcess - undefined
   * @param idFamily - undefined
   * @param idCooling - undefined
   */
  getModels(params: ProfileService.GetModelsParams): Observable<Translation> {
    return this.getModelsResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get list langue
   */
  getLangueResponse(): Observable<HttpResponse<Translation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/users/lang`,
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
        let _body: Translation = null;
        _body = _resp.body as Translation
        return _resp.clone({body: _body}) as HttpResponse<Translation>;
      })
    );
  }

  /**
   * get list langue
   */
  getLangue(): Observable<Translation> {
    return this.getLangueResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get list Monetary
   */
  getMonetaryResponse(): Observable<HttpResponse<MonetaryCurrency>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/users/monetary`,
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
        let _body: MonetaryCurrency = null;
        _body = _resp.body as MonetaryCurrency
        return _resp.clone({body: _body}) as HttpResponse<MonetaryCurrency>;
      })
    );
  }

  /**
   * get list Monetary
   */
  getMonetary(): Observable<MonetaryCurrency> {
    return this.getMonetaryResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get list units user
   * @param id - undefined
   */
  getUnitsResponse(id: number): Observable<HttpResponse<Units>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/users/${id}/units`,
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
        let _body: Units = null;
        _body = _resp.body as Units
        return _resp.clone({body: _body}) as HttpResponse<Units>;
      })
    );
  }

  /**
   * get list units user
   * @param id - undefined
   */
  getUnits(id: number): Observable<Units> {
    return this.getUnitsResponse(id).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * update unit users
   * @param id - undefined
   * @param body - body update unit users
   */
  updateUnitsResponse(params: ProfileService.UpdateUnitsParams): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    __body = params.body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/users/${params.id}/units`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: number = null;
        _body = parseFloat(_resp.body as string)
        return _resp.clone({body: _body}) as HttpResponse<number>;
      })
    );
  }

  /**
   * update unit users
   * @param id - undefined
   * @param body - body update unit users
   */
  updateUnits(params: ProfileService.UpdateUnitsParams): Observable<number> {
    return this.updateUnitsResponse(params).pipe(
      map(_r => _r.body)
    );
  }}

export module ProfileService {
  export interface ChangePasswordParams {
    id: number;
    body: ChangePassword;
  }
  export interface GetFamiliesParams {
    manufacturerLabel?: string;
    idCooling?: number;
  }
  export interface GetOriginesParams {
    manufacturerLabel?: string;
    idFamily?: number;
    idCooling?: number;
  }
  export interface GetProcessesParams {
    manufacturerLabel?: string;
    idStd?: number;
    idFamily?: number;
    idCooling?: number;
  }
  export interface GetModelsParams {
    manufacturerLabel?: string;
    idStd?: number;
    idProcess?: number;
    idFamily?: number;
    idCooling?: number;
  }
  export interface UpdateUnitsParams {
    id: number;
    body: Profile;
  }
}
