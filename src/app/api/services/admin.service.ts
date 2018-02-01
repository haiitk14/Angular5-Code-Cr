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

import { ViewUsers } from '../models/view-users';
import { NewUser } from '../models/new-user';
import { Connection } from '../models/connection';


@Injectable()
export class AdminService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   */
  getUsersResponse(): Observable<HttpResponse<ViewUsers[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/admin/users`,
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
        let _body: ViewUsers[] = null;
        _body = _resp.body as ViewUsers[]
        return _resp.clone({body: _body}) as HttpResponse<ViewUsers[]>;
      })
    );
  }

  /**
   */
  getUsers(): Observable<ViewUsers[]> {
    return this.getUsersResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create new user
   * @param body - body create new user
   */
  newUserResponse(body: NewUser): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/admin/users`,
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
   * Create new user
   * @param body - body create new user
   */
  newUser(body: NewUser): Observable<number> {
    return this.newUserResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * update user
   * @param id - undefined
   * @param body - body update user
   */
  updateUserResponse(params: AdminService.UpdateUserParams): Observable<HttpResponse<number[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    __body = params.body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/admin/users/${params.id}`,
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
   * update user
   * @param id - undefined
   * @param body - body update user
   */
  updateUser(params: AdminService.UpdateUserParams): Observable<number[]> {
    return this.updateUserResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * delete user
   * @param id - undefined
   */
  deleteUserResponse(id: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/admin/users/${id}`,
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
        let _body: void = null;
        
        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * delete user
   * @param id - undefined
   */
  deleteUser(id: number): Observable<void> {
    return this.deleteUserResponse(id).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param reset - status disconnect user
   * @param id - User id
   */
  disconnectUserResponse(params: AdminService.DisconnectUserParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.reset != null) __params = __params.set("reset", params.reset.toString());
    
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/admin/connections/${params.id}`,
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
        let _body: void = null;
        
        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * @param reset - status disconnect user
   * @param id - User id
   */
  disconnectUser(params: AdminService.DisconnectUserParams): Observable<void> {
    return this.disconnectUserResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param record - number record connections
   */
  loadConnectionsResponse(record: number): Observable<HttpResponse<Connection[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (record != null) __params = __params.set("record", record.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/admin/connections`,
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
        let _body: Connection[] = null;
        _body = _resp.body as Connection[]
        return _resp.clone({body: _body}) as HttpResponse<Connection[]>;
      })
    );
  }

  /**
   * @param record - number record connections
   */
  loadConnections(record: number): Observable<Connection[]> {
    return this.loadConnectionsResponse(record).pipe(
      map(_r => _r.body)
    );
  }}

export module AdminService {
  export interface UpdateUserParams {
    id: number;
    body: NewUser;
  }
  export interface DisconnectUserParams {
    reset: number;
    id: number;
  }
}
