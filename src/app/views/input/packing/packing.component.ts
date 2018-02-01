import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ApiService } from '../../../api/services/api.service';
import { Study } from '../../../api/models/study';
import { PackingLayer } from '../../../api/models/packing-layer';
import { ViewPackingLayer } from '../../../api/models/view-packing-layer';
import { AfterViewInit, AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { PackingElement } from '../../../api/models/packing-element';
import { Router } from '@angular/router';
import { ViewProduct } from '../../../api/models/view-product';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { TextService } from '../../../shared/text.service';

@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.scss']
})
export class PackingComponent implements OnInit, AfterContentChecked, AfterViewInit {

  public topNrLayer: number;
  public sideNrLayer: number;
  public bottomNrLayer: number;

  public packingName: string;

  public topLayers: PackingLayer[] = [];
  public sideLayers: PackingLayer[] = [];
  public bottomLayers: PackingLayer[] = [];

  public defaultThickness = 10;
  public productShape = 0;
  public imgSrc = '';
  public study: Study;

  public packingElements: PackingElement[];

  public packingView: ViewPackingLayer;
  public productView: ViewProduct;

  public laddaSavingPacking = false;

  constructor(private api: ApiService, private router: Router, private toastr: ToastrService, public text: TextService) {
    this.topNrLayer = 0;
    this.sideNrLayer = 0;
    this.bottomNrLayer = 0;
  }

  public isLoading = true;

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.study = JSON.parse(localStorage.getItem('study'));
    this.api.getStudyPackingLayers(this.study.ID_STUDY).subscribe (
      (response: ViewPackingLayer) => {
        if (response.packing && response.packingLayers) {
          this.packingView = response;

          this.packingView.packingLayers.forEach(layer => {
            switch (Number(layer.PACKING_SIDE_NUMBER)) {
              case 1:
                this.topLayers.push(layer);
                break;

              case 2:
                this.sideLayers.push(layer);
                break;

              case 3:
                this.bottomLayers.push(layer);
                break;
            }
          });

          this.packingName = this.packingView.packing.NOMEMBMAT;

          this.topNrLayer = this.topLayers.length;
          this.sideNrLayer = this.sideLayers.length;
          this.bottomNrLayer = this.bottomLayers.length;
        }
      },
      err => {

      },
      () => {
        this.isLoading = false;
      }
    );

    this.api.findPackingElements().subscribe(
      (response: PackingElement[]) => {
        this.packingElements = response;
      }
    );
  }

  ngAfterContentChecked() {
    this.study = JSON.parse(localStorage.getItem('study'));
    this.productShape = Number(localStorage.getItem('productShape'));
    this.productView = JSON.parse(localStorage.getItem('productView'));

    if (this.productShape == 0 || !this.productView.elements || this.productView.elements.length == 0) {
      swal('Oops..', 'Please define product first', 'error');
      this.router.navigate(['/input/product']);
      return;
    }
    this.imgSrc = this.shapeImgShim(JSON.parse(localStorage.getItem('shapes'))[this.productShape - 1].SHAPEPICT);
  }

  private shapeImgShim(shapePict: string) {
    return '/assets/img/packing/pack_' + shapePict.split('/').pop().split('.').shift().substr(5) + '.jpg';
  }

  private getTopLabel(shapeCode: number) {
    switch (shapeCode) {
      case this.text.shapeNames.SPHERE:
        return 'All around';
      case this.text.shapeNames.CYL_LAY:
      case this.text.shapeNames.CON_CYL_LAY:
        return 'Side';
    }
    return 'Top';
  }

  private getSideLabel(shapeCode: number) {
    switch (shapeCode) {
      case this.text.shapeNames.REC_LAY:
      case this.text.shapeNames.REC_STAND:
      case this.text.shapeNames.BREAD:
        return '4 Sides';

      case this.text.shapeNames.CYL_LAY:
      case this.text.shapeNames.CON_CYL_LAY:
        return 'Rear';
    }

    return 'Side';
  }

  private getBottomLabel(shapeCode: number) {
    switch (shapeCode) {
      case this.text.shapeNames.CYL_LAY:
      case this.text.shapeNames.CON_CYL_LAY:
        return 'Rear';
    }
    return 'Bottom';
  }

  savePacking() {
    if (!this.packingName) {
      swal('Oops', 'Please input packing name', 'error');
      return;
    }
    this.laddaSavingPacking = true;
    const updateParams = {
      id: this.study.ID_STUDY,
      body: {
        packing: {
          ID_STUDY: this.study.ID_STUDY,
          ID_PACKING: this.study.ID_PACKING,
          ID_SHAPE: this.productShape,
          NOMEMBMAT: this.packingName
        },
        packingLayers: []
      }
    };

    this.topLayers.forEach((element, index) => {
      updateParams.body.packingLayers.push( {
        ID_PACKING_ELMT: element.ID_PACKING_ELMT,
        PACKING_SIDE_NUMBER: 1,
        PACKING_LAYER_ORDER: index,
        THICKNESS: element.THICKNESS
      });
    });

    this.sideLayers.forEach((element, index) => {
      updateParams.body.packingLayers.push({
        ID_PACKING_ELMT: element.ID_PACKING_ELMT,
        PACKING_SIDE_NUMBER: 2,
        PACKING_LAYER_ORDER: index,
        THICKNESS: element.THICKNESS
      });
    });

    this.bottomLayers.forEach((element, index) => {
      updateParams.body.packingLayers.push({
        ID_PACKING_ELMT: element.ID_PACKING_ELMT,
        PACKING_SIDE_NUMBER: 3,
        PACKING_LAYER_ORDER: index,
        THICKNESS: element.THICKNESS
      });
    });

    this.api.savePacking(updateParams).subscribe(
      response => {
        this.laddaSavingPacking = false;
        this.toastr.success('Product packing specification saved.', 'Success');
      },
      err => {

      }
    );
  }

  onTopNrLayerChanged() {
    this.topLayers = [];

    for (let index = 0; index < this.topNrLayer; index++) {
      let p = new PackingLayer();
      p.THICKNESS = this.defaultThickness;
      p.PACKING_LAYER_ORDER = index;
      p.PACKING_SIDE_NUMBER = 1;
      this.topLayers.push( p );
    }
  }

  onSideNrLayerChanged() {
    this.sideLayers = [];
    for (let index = 0; index < this.sideNrLayer; index++) {
      let p = new PackingLayer();
      p.THICKNESS = this.defaultThickness;
      p.PACKING_LAYER_ORDER = index;
      p.PACKING_SIDE_NUMBER = 2;
      this.sideLayers.push(p);
    }
  }

  onBottomNrLayerChanged() {
    this.bottomLayers = [];
    for (let index = 0; index < this.bottomNrLayer; index++) {
      let p = new PackingLayer();
      p.THICKNESS = this.defaultThickness;
      p.PACKING_LAYER_ORDER = index;
      p.PACKING_SIDE_NUMBER = 3;
      this.bottomLayers.push(p);
    }
  }

  onSideSameAsTop() {
    this.sideNrLayer = this.topNrLayer;

    this.onSideNrLayerChanged();
    this.sideLayers = this.topLayers;
  }

  onSideSameAsBottom() {
    this.sideNrLayer = this.bottomNrLayer;

    this.onSideNrLayerChanged();
    this.sideLayers = this.bottomLayers;
  }

  onBottomSameAsTop() {
    this.bottomNrLayer = this.topNrLayer;

    this.onBottomNrLayerChanged();
    this.bottomLayers = this.topLayers;
  }

}
