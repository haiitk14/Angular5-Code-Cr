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

import { ViewComponent } from '../models/view-component';
import { ViewTemperature } from '../models/view-temperature';
import { MyComponent } from '../models/my-component';
import { Compenth } from '../models/compenth';
import { ViewPackingElmt } from '../models/view-packing-elmt';
import { NewPacking } from '../models/new-packing';
import { ViewPipeLineElmt } from '../models/view-pipe-line-elmt';
import { PipeLineElmt } from '../models/pipe-line-elmt';
import { ViewEquipment } from '../models/view-equipment';
import { NewEquipment } from '../models/new-equipment';


@Injectable()
export class ReferencedataService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a list of family component
   * @param compfamily - undefined
   */
  getDataComponentResponse(compfamily: string): Observable<HttpResponse<ViewComponent>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (compfamily != null) __params = __params.set("compfamily", compfamily.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/referencedata/component`,
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
        let _body: ViewComponent = null;
        _body = _resp.body as ViewComponent
        return _resp.clone({body: _body}) as HttpResponse<ViewComponent>;
      })
    );
  }

  /**
   * Get a list of family component
   * @param compfamily - undefined
   */
  getDataComponent(compfamily: string): Observable<ViewComponent> {
    return this.getDataComponentResponse(compfamily).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Save data component
   * @param body - body save Component
   */
  saveDataComponentResponse(body: ViewComponent): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/referencedata/component`,
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
   * Save data component
   * @param body - body save Component
   */
  saveDataComponent(body: ViewComponent): Observable<number> {
    return this.saveDataComponentResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param id - Component Id
   */
  getTemperaturesByIdCompResponse(id: number): Observable<HttpResponse<ViewTemperature[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/referencedata/component/${id}`,
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
        let _body: ViewTemperature[] = null;
        _body = _resp.body as ViewTemperature[]
        return _resp.clone({body: _body}) as HttpResponse<ViewTemperature[]>;
      })
    );
  }

  /**
   * @param id - Component Id
   */
  getTemperaturesByIdComp(id: number): Observable<ViewTemperature[]> {
    return this.getTemperaturesByIdCompResponse(id).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * delete component
   * @param id - undefined
   */
  deleteComponentResponse(id: number): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/referencedata/component/${id}`,
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
   * delete component
   * @param id - undefined
   */
  deleteComponent(id: number): Observable<number> {
    return this.deleteComponentResponse(id).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * run calculatefreeze component
   * @param body - body run calculatefreeze
   */
  calculateFreezeResponse(body: ViewComponent): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/referencedata/calculatefreeze`,
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
   * run calculatefreeze component
   * @param body - body run calculatefreeze
   */
  calculateFreeze(body: ViewComponent): Observable<number> {
    return this.calculateFreezeResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * run calculate component
   * @param body - body run calculate
   */
  startFCCalculateResponse(body: ViewComponent): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/referencedata/calculate`,
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
   * run calculate component
   * @param body - body run calculate
   */
  startFCCalculate(body: ViewComponent): Observable<number> {
    return this.startFCCalculateResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Get list my component
   */
  getMyComponentResponse(): Observable<HttpResponse<MyComponent>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/referencedata/components`,
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
        let _body: MyComponent = null;
        _body = _resp.body as MyComponent
        return _resp.clone({body: _body}) as HttpResponse<MyComponent>;
      })
    );
  }

  /**
   * Get list my component
   */
  getMyComponent(): Observable<MyComponent> {
    return this.getMyComponentResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Get list compenth by Id compenth
   * @param idComp - Compenth id
   */
  getCompenthsByIdCompResponse(idComp: number): Observable<HttpResponse<Compenth[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/referencedata/compenths/${idComp}`,
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
        let _body: Compenth[] = null;
        _body = _resp.body as Compenth[]
        return _resp.clone({body: _body}) as HttpResponse<Compenth[]>;
      })
    );
  }

  /**
   * Get list compenth by Id compenth
   * @param idComp - Compenth id
   */
  getCompenthsByIdComp(idComp: number): Observable<Compenth[]> {
    return this.getCompenthsByIdCompResponse(idComp).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Get compenth by id
   * @param id - Compenth id
   */
  getCompenthByIdResponse(id: number): Observable<HttpResponse<Compenth>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/referencedata/compenth/${id}`,
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
        let _body: Compenth = null;
        _body = _resp.body as Compenth
        return _resp.clone({body: _body}) as HttpResponse<Compenth>;
      })
    );
  }

  /**
   * Get compenth by id
   * @param id - Compenth id
   */
  getCompenthById(id: number): Observable<Compenth> {
    return this.getCompenthByIdResponse(id).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Save data compenth
   * @param body - body save Compenth
   */
  updateCompenthResponse(body: Compenth): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/referencedata/compenth`,
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
   * Save data compenth
   * @param body - body save Compenth
   */
  updateCompenth(body: Compenth): Observable<number> {
    return this.updateCompenthResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Get a list of packingelmt
   */
  findRefPackingElmtResponse(): Observable<HttpResponse<ViewPackingElmt>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/referencedata/packing`,
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
        let _body: ViewPackingElmt = null;
        _body = _resp.body as ViewPackingElmt
        return _resp.clone({body: _body}) as HttpResponse<ViewPackingElmt>;
      })
    );
  }

  /**
   * Get a list of packingelmt
   */
  findRefPackingElmt(): Observable<ViewPackingElmt> {
    return this.findRefPackingElmtResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create new packing
   * @param body - body create new packing
   */
  newPackingResponse(body: NewPacking): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/referencedata/packing`,
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
   * Create new packing
   * @param body - body create new packing
   */
  newPacking(body: NewPacking): Observable<number> {
    return this.newPackingResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * update packing
   * @param id - undefined
   * @param body - body update packing
   */
  updatePackingResponse(params: ReferencedataService.UpdatePackingParams): Observable<HttpResponse<number[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    __body = params.body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/referencedata/packing/${params.id}`,
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
   * update packing
   * @param id - undefined
   * @param body - body update packing
   */
  updatePacking(params: ReferencedataService.UpdatePackingParams): Observable<number[]> {
    return this.updatePackingResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * save as packing
   * @param id - undefined
   * @param body - body save as packing
   */
  saveAsPackingResponse(params: ReferencedataService.SaveAsPackingParams): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    __body = params.body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/referencedata/packing/${params.id}`,
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
   * save as packing
   * @param id - undefined
   * @param body - body save as packing
   */
  saveAsPacking(params: ReferencedataService.SaveAsPackingParams): Observable<number> {
    return this.saveAsPackingResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * delete Packing
   * @param id - undefined
   */
  deletePackingResponse(id: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/referencedata/packing/${id}`,
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
   * delete Packing
   * @param id - undefined
   */
  deletePacking(id: number): Observable<void> {
    return this.deletePackingResponse(id).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Get a list of pipeLineElmt
   */
  findRefPipelineResponse(): Observable<HttpResponse<ViewPipeLineElmt>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/referencedata/pipeline`,
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
        let _body: ViewPipeLineElmt = null;
        _body = _resp.body as ViewPipeLineElmt
        return _resp.clone({body: _body}) as HttpResponse<ViewPipeLineElmt>;
      })
    );
  }

  /**
   * Get a list of pipeLineElmt
   */
  findRefPipeline(): Observable<ViewPipeLineElmt> {
    return this.findRefPipelineResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create new pipeline
   * @param body - body create new pipeline
   */
  newPipeLineResponse(body: PipeLineElmt): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/referencedata/pipeline`,
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
   * Create new pipeline
   * @param body - body create new pipeline
   */
  newPipeLine(body: PipeLineElmt): Observable<number> {
    return this.newPipeLineResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * update pipe line
   * @param id - undefined
   * @param body - body update pipe line
   */
  updatePipeLineResponse(params: ReferencedataService.UpdatePipeLineParams): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    __body = params.body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/referencedata/pipeline/${params.id}`,
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
   * update pipe line
   * @param id - undefined
   * @param body - body update pipe line
   */
  updatePipeLine(params: ReferencedataService.UpdatePipeLineParams): Observable<number> {
    return this.updatePipeLineResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * save as pipe line
   * @param name - undefined
   * @param id - undefined
   */
  saveAsPipeLineResponse(params: ReferencedataService.SaveAsPipeLineParams): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.name != null) __params = __params.set("name", params.name.toString());
    
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/referencedata/pipeline/${params.id}`,
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
   * save as pipe line
   * @param name - undefined
   * @param id - undefined
   */
  saveAsPipeLine(params: ReferencedataService.SaveAsPipeLineParams): Observable<number> {
    return this.saveAsPipeLineResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * delete pipe line
   * @param id - undefined
   */
  deletePipeLineResponse(id: number): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/referencedata/pipeline/${id}`,
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
   * delete pipe line
   * @param id - undefined
   */
  deletePipeLine(id: number): Observable<number> {
    return this.deletePipeLineResponse(id).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Get a list of equipment
   */
  findRefEquipmentResponse(): Observable<HttpResponse<ViewEquipment>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/referencedata/equipments`,
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
        let _body: ViewEquipment = null;
        _body = _resp.body as ViewEquipment
        return _resp.clone({body: _body}) as HttpResponse<ViewEquipment>;
      })
    );
  }

  /**
   * Get a list of equipment
   */
  findRefEquipment(): Observable<ViewEquipment> {
    return this.findRefEquipmentResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create new equipment
   * @param body - body create new equipment
   */
  newEquipmentResponse(body: NewEquipment): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/referencedata/equipments`,
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
   * Create new equipment
   * @param body - body create new equipment
   */
  newEquipment(body: NewEquipment): Observable<number> {
    return this.newEquipmentResponse(body).pipe(
      map(_r => _r.body)
    );
  }}

export module ReferencedataService {
  export interface UpdatePackingParams {
    id: number;
    body: NewPacking;
  }
  export interface SaveAsPackingParams {
    id: number;
    body: NewPacking;
  }
  export interface UpdatePipeLineParams {
    id: number;
    body: PipeLineElmt;
  }
  export interface SaveAsPipeLineParams {
    name: string;
    id: number;
  }
}
