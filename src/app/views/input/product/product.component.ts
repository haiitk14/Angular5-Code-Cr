import { Component, OnInit, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ApiService } from '../../../api/services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { TextService } from '../../../shared/text.service';
import { NgxLocalizedNumbersService } from 'ngx-localized-numbers';
import { LocalizationFormatCurrencyPipe } from 'ngx-localized-numbers';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppSpinnerComponent } from '../../../components';

import swal from 'sweetalert2';

import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import * as Models from '../../../api/models';

@Pipe({ name: 'compFilter' })
export class CompFilterPipe implements PipeTransform {
  constructor(private translate: TranslateService) {

  }
  public transform(values: Models.Component[], filter: string): any[] {
    if (!values || !values.length) {
      return [];
    }
    if (!filter) {
      return values;
    }

    return values.filter((v: Models.Component) => {
      return this.translate.instant('components.' + v.ID_COMP).toLowerCase().indexOf(filter.toLowerCase()) >= 0;
    });
  }
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {
  @ViewChild('addElementModal') public addElementModal: ModalDirective;
  @ViewChild('modalEditProduct') public modalEditProduct: ModalDirective;
  @ViewChild('editCompModal') public editCompModal: ModalDirective;

  public laddaAddComponent = false;
  public laddaConfirmAddComponent = false;
  public laddaUpdateElement = false;
  public isLoading = true;

  public elementForm = {
    description: '',
    specific_dim: 0.0,
    computed_mass: 0.0,
    real_mass: 0.0,
    elementId: 0
  };

  public productForm = {
    name: '',
    shape: 0,
    dim1: 0,
    dim2: 0,
    dim3: 0
  };
  public previewImgSrc;
  public availShapes = [];

  public shapeSelect = 0;
  public productShape = 0;
  public product: Models.Product;
  private study: Models.Study;
  private productModel: Models.ViewProduct;

  public elements: Models.ProductElmt[] = [];

  public selectedAddingElement: Models.Component;

  public shapeNames;

  public prodDim1: number;
  public prodDim2: number;
  public prodDim3: number;

  public laddaDeletingElmts: boolean[];

  public filterString = '';

  columns =
    [
      { text: 'up/down', columntype: 'text', width: 80 },
      { text: 'Product Name', datafield: 'PROD_ELMT_NAME', columntype: 'text' },
      { text: 'Description', columntype: 'text', width: 150 },
      { text: 'Specific Dim.', width: 100, cellsalign: 'right', cellsformat: 'f3' },
      { text: 'Calculated mass', datafield: 'PROD_ELMT_WEIGHT', width: 100, cellsalign: 'right', cellsformat: 'f3' },
      { text: 'Real mass', datafield: 'PROD_ELMT_REALWEIGHT', cellsalign: 'right', cellsformat: 'f3', width: 100 },
      { text: 'Action', cellsalign: 'right', cellsformat: 'f3', width: 100 },
    ];

  dropDownSource: string[] = ['First Name', 'Last Name', 'Product', 'Quantity', 'Price'];

  components: Models.ViewComponents;

  constructor(private api: ApiService, private text: TextService,
    private localizedNumbersService: NgxLocalizedNumbersService) {
    this.productForm.shape = 0;
    this.productForm.dim1 = 0;
    this.productForm.dim2 = 0;
    this.productForm.dim3 = 0;
    this.productForm.name = '';
    this.shapeNames = text.shapeNames;
  }

  onSelectAddingElement(selected) {
    this.selectedAddingElement = selected;
  }

  onChangeShape() {
    this.previewImgSrc = this.shapeImgShim(this.availShapes[ this.productForm.shape - 1 ].SHAPEPICT);
  }

  ngOnInit() {
    this.productShape = 0;
  }

  ngAfterViewInit() {
    this.isLoading = true;
    this.study = JSON.parse(localStorage.getItem('study'));
    this.api.getShapes().subscribe(
      shapes => {
        this.availShapes = shapes;
        this.previewImgSrc = this.shapeImgShim(shapes[0].SHAPEPICT);
        localStorage.setItem('shapes', JSON.stringify(this.availShapes));
        this.refreshViewModel();
      }
    );
  }

  private shapeImgShim(shapePict: string) {
    return '/assets/img/product/' + shapePict.split('/').pop().split('.').shift().substr(5) + '.png';
  }

  saveProduct() {
    this.modalEditProduct.hide();

    if (this.productForm.shape !== this.productShape) {
      this.productShape = this.productForm.shape;
      this.api.newProduct({
        id: this.study.ID_STUDY,
        name: this.productForm.name
      }).subscribe(
        response => {
          this.refreshViewModel();
        },
        err => {

        }
      );
    } else {
      const updateParams: ApiService.UpdateProductParams = {
        id: this.study.ID_STUDY,
        updateParams: {}
      };
      if (this.product.PRODNAME !== this.productForm.name) {
        updateParams.updateParams.name = this.product.PRODNAME;
      }
      if (this.prodDim1 !== this.productForm.dim1 && this.hasDim1()) {
        updateParams.updateParams.dim1 = this.productForm.dim1;
      }
      if (this.prodDim3 !== this.productForm.dim3 && this.hasDim3()) {
        updateParams.updateParams.dim3 = this.productForm.dim3;
      }

      this.api.updateProduct(updateParams).subscribe(
        response => {
          this.refreshViewModel();
        },
        err => {
          console.log(err);
        }
      );
    }

    this.prodDim1 = this.productForm.dim1;
    this.prodDim2 = this.productForm.dim2;
    this.prodDim3 = this.productForm.dim3;
  }

  onShowAddElement() {
    this.laddaAddComponent = true;
    this.laddaConfirmAddComponent = false;
    if (this.productShape == 0) {
      swal('Oops...', 'Product must be defined before adding elements!', 'error');

      return false;
    }
    this.addElementModal.show();
  }

  refreshViewModel() {
    this.api.getProductViewModel(this.study.ID_PROD).subscribe(
      (response: Models.ViewProduct) => {
        localStorage.setItem('productView', JSON.stringify(response));
        this.laddaDeletingElmts = new Array<boolean>(response.elements.length);
        this.laddaDeletingElmts.fill(false);
        this.elements = response.elements;
        this.product = response.product;
        this.prodDim2 = response.specificDimension;
        if (this.elements.length > 0) {
          this.productShape = this.elements[0].ID_SHAPE;
          localStorage.setItem('productShape', this.productShape.toString());
          this.prodDim1 = Number(Number(this.elements[0].SHAPE_PARAM1).toFixed(3));
          this.prodDim3 = Number(Number(this.elements[0].SHAPE_PARAM3).toFixed(3));

          this.productForm.shape = this.productShape;
          this.productForm.dim1 = this.prodDim1;
          this.productForm.dim3 = this.prodDim3;
          this.productForm.name = this.product.PRODNAME;
        } else {
          localStorage.removeItem('productShape');
        }
      },
      err => {
        console.log(err);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  hasDim1() {
    return (this.productShape != this.shapeNames.SLAB && this.productShape != this.shapeNames.SPHERE);
  }

  hasDim3() {
    return (this.productShape == this.shapeNames.REC_LAY 
      || this.productShape == this.shapeNames.REC_STAND || this.productShape == this.shapeNames.BREAD);
  }

  onAddElement() {
    if (this.selectedAddingElement.COMP_RELEASE == 6) {
      swal('Error', 'Adding sleeping component is under development, not ready to use! Please select an active component.', 'error');
      return false;
    }
    let params: ApiService.AppendElementsToProductParams = {
      id: this.product.ID_PROD,
      shapeId: this.productShape,
      componentId: this.selectedAddingElement.ID_COMP
    };
    this.laddaConfirmAddComponent = true;

    if (this.hasDim1()) {
      params.dim1 = this.prodDim1;
    }

    if (this.hasDim3()) {
      params.dim3 = this.prodDim3;
    }

    this.api.appendElementsToProduct(params).subscribe( data => {
      this.addElementModal.hide();
      this.refreshViewModel();
    });
  }

  onEditProductModalShow(eventType: string, event) {
    if (!this.components || this.components.active.length === 0) {
      this.api.findComponents({}).subscribe(
        data => {
          this.components = data;
          this.laddaAddComponent = false;
        }
      );
    } else {
      this.laddaAddComponent = false;
    }
  }

  onRemoveElement(element: Models.ProductElmt, index: number) {
    console.log(index);
    console.log(this.laddaDeletingElmts);
    this.laddaDeletingElmts[index] = true;
    this.api.removeProductElement({
      id: this.product.ID_PROD,
      elementId: element.ID_PRODUCT_ELMT
    }).subscribe(
      response => {
        this.refreshViewModel();
      },
      err => {
        this.laddaDeletingElmts[index] = false;
      },
      () => {
        console.log('delete elmt completed');
        this.laddaDeletingElmts[index] = false;
      }
    );
  }

  onEditElement(element: Models.ProductElmt) {
    this.elementForm.computed_mass = Number(Number(element.PROD_ELMT_WEIGHT).toPrecision(3));
    this.elementForm.real_mass = Number(Number(element.PROD_ELMT_REALWEIGHT).toPrecision(3));
    this.elementForm.description = element.PROD_ELMT_NAME;
    this.elementForm.elementId = element.ID_PRODUCT_ELMT;
    this.elementForm.specific_dim = Number(Number(element.SHAPE_PARAM2).toPrecision(3));
    this.editCompModal.show();
  }

  onMoveUpElement(element: Models.ProductElmt) {
    this.api.productElementMoveUp(element.ID_PRODUCT_ELMT).subscribe(
      response => {
        this.refreshViewModel();
      },
      err => {

      }
    );
  }

  onMoveDownElement(element: Models.ProductElmt) {
    this.api.productElementMoveDown(element.ID_PRODUCT_ELMT).subscribe(
      response => {
        this.refreshViewModel();
      },
      err => {

      }
    );
  }

  updateProductElement() {
    this.laddaUpdateElement = true;
    this.api.updateProductElement({
      id: this.product.ID_PROD,
      dim2: this.elementForm.specific_dim,
      elementId: this.elementForm.elementId,
      description: this.elementForm.description,
      computedmass: this.elementForm.computed_mass,
      realmass: this.elementForm.real_mass
    }).subscribe(
      response => {
        this.refreshViewModel();
        this.editCompModal.hide();
        this.laddaUpdateElement = false;
      },
      err => {
        console.log(err);
      },
      () => {
        this.laddaUpdateElement = false;
      }
    );
  }
}
