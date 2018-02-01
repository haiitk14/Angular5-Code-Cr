import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { ApiService } from '../../../api/services/api.service';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit, AfterViewInit {
  @ViewChild('modalValuePrice') public modalValuePrice: ModalDirective;
  @ViewChild('modalValueUnit') public modalValueUnit: ModalDirective;
  constructor(private api: ApiService, private translate: TranslateService) { }

  public priceMoneySelect;
  public kernelMonetary;
  public monetary;
  public listUnit;
  public symbolSelectSymbol: Array<any> = [];
  public symbolSelectCoeffA: Array<any> = [];
  public symbolSelectCoeffB: Array<any> = [];
  public symbolSelectIdUnit: Array<any> = [];
  public modifyPrice: number;
  public showModifyPrice: boolean;
  public showNewPrice: boolean;
  public priceText;
  public priceSymbol;
  public priceTextNew: string;
  public priceSymbolNew: string;
  public valueUnitName: string;
  public modifyUnit: number;
  public showModifyUnit: boolean;
  public showNewUnit: boolean;
  public valueUnitSymbol: string;
  public valueUnitCoeffA: number;
  public valueUnitCoeffB: number;
  public newUnitSymbol: string;
  public newUnitCoeffA: number;
  public newUnitCoeffB: number;
  public unitKernal: boolean;
  public idUnit;
  public typeUnit;

  ngOnInit() {
    this.modifyPrice = 1;
    this.showModifyPrice = true;
    this.showNewPrice = false;
    this.priceTextNew = '';
    this.priceSymbolNew = '';
    this.modifyUnit = 1;
    this.showModifyUnit = true;
    this.showNewUnit = false;
    this.newUnitCoeffA = 1;
    this.newUnitCoeffB = 0;
    this.unitKernal = true;
    this.newUnitSymbol = '';
  }

  ngAfterViewInit() {
    this.refeshView();
  }
  refeshView() {
    this.api.units().subscribe(
      data => {
        this.kernelMonetary = data.kernelMonetary;
        this.priceMoneySelect = data.kernelMonetary.ID_MONETARY_CURRENCY;
        this.monetary = data.monetary;
        this.listUnit = data.listUnit;
        for (let i = 0; i < Object.keys(this.listUnit).length; i++) {
          this.symbolSelectSymbol.push(this.listUnit[i]['SYMBOL']);
          this.symbolSelectCoeffA.push(this.listUnit[i]['COEFF_A']);
          this.symbolSelectCoeffB.push(this.listUnit[i]['COEFF_B']);
          this.symbolSelectIdUnit.push(this.listUnit[i]['value']);
        }
      }
    );
  }
  loadSymbol(i, symbol) {
    const symbolSelected = this.listUnit[i].symbolSelect;
    for (let j = 0; j < Object.keys(symbolSelected).length; j++) {
      if (symbolSelected[j]['SYMBOL'] == symbol) {
        this.symbolSelectSymbol[i] = symbolSelected[j]['SYMBOL'];
        this.symbolSelectCoeffA[i] = symbolSelected[j]['COEFF_A'];
        this.symbolSelectCoeffB[i] = symbolSelected[j]['COEFF_B'];
        this.symbolSelectIdUnit[i] = symbolSelected[j]['ID_UNIT'];
      }
    }
  }
  onModalValuePrice() {
    console.log(this.priceMoneySelect);
    this.api.getMonetaryCurrencyById(this.priceMoneySelect).subscribe(
      data => {
        console.log(this.priceText);
        this.priceText = data.MONEY_TEXT;
        this.priceSymbol = data.MONEY_SYMB;
      }
    );
    this.modalValuePrice.show();
  }
  showPriceForm(value) {
    if (value == 'modify') {
      this.showModifyPrice = true;
      this.showNewPrice = false;
    } else {
      this.showModifyPrice = false;
      this.showNewPrice = true;
    }
  }
  savePrice() {
    console.log(this.modifyPrice);
    if (this.modifyPrice == 1) {
      if (this.priceText == '') {
        swal('Oops..', this.translate.instant('Enter a value in Text !'), 'error');
      } else if (this.priceSymbol == '') {
        swal('Oops..', this.translate.instant('Enter a value in Symbol !'), 'error');
      }
      const params = {
        ID_MONETARY_CURRENCY: this.priceMoneySelect,
        MONEY_TEXT: this.priceText,
        MONEY_SYMB: this.priceSymbol
      };
      this.api.saveMonetaryCurrency(params).subscribe(
        data => {
          this.showModifyPrice = true;
          this.showNewPrice = false;
          this.modalValuePrice.hide();
          this.refeshView();
        }
      );
    }
    if (this.modifyPrice == 0) {
      if (this.priceTextNew == '') {
        swal('Oops..', this.translate.instant('Enter a value in Text !'), 'error');
      } else if (this.priceSymbolNew == '') {
        swal('Oops..', this.translate.instant('Enter a value in Symbol !'), 'error');
      }
      const params = {
        MONEY_TEXT: this.priceTextNew,
        MONEY_SYMB: this.priceSymbolNew
      };
      this.api.createMonetaryCurrency(params).subscribe(
        data => {
          this.modifyPrice = 1;
          this.showModifyPrice = true;
          this.showNewPrice = false;
          this.modalValuePrice.hide();
          this.priceTextNew = '';
          this.priceSymbolNew = '';
          this.refeshView();
        }
      );
    }
  }
  onModalValueUnit(i) {
    if (this.listUnit[i]['value'] != this.symbolSelectIdUnit[i]) {
      this.unitKernal = false;
    } else {
      this.unitKernal = true;
    }
    this.typeUnit = this.listUnit[i]['value'];
    this.idUnit = this.symbolSelectIdUnit[i];
    this.modifyUnit = 1;
    this.showModifyUnit = true;
    this.showNewUnit = false;
    this.valueUnitName = this.listUnit[i]['name'];
    this.valueUnitSymbol = this.symbolSelectSymbol[i];
    this.valueUnitCoeffA = this.symbolSelectCoeffA[i];
    this.valueUnitCoeffB = this.symbolSelectCoeffB[i];
    this.modalValueUnit.show();
  }
  showUnitForm(value) {
    if (value == 'modify') {
      this.modifyUnit = 1;
      this.showModifyUnit = true;
      this.showNewUnit = false;
    } else {
      this.modifyUnit = 0;
      this.showModifyUnit = false;
      this.showNewUnit = true;
    }
  }
  saveUnit() {
    if (this.modifyUnit == 1) {
      if (this.valueUnitSymbol == '') {
        swal('Oops..', this.translate.instant('Enter a value in Symbol !'), 'error');
        return false;
      } else if (!this.valueUnitCoeffA) {
        swal('Oops..', this.translate.instant('Enter a value in A !'), 'error');
        return false;
      } else if (Number.isInteger(Math.floor(this.valueUnitCoeffA)) === false) {
        swal('Oops..', this.translate.instant('Not a valid number in A !'), 'error');
        return false;
      } else if (!this.valueUnitCoeffB) {
        swal('Oops..', this.translate.instant('Enter a value in B !'), 'error');
        return false;
      } else if (Number.isInteger(Math.floor(this.valueUnitCoeffB)) === false) {
        swal('Oops..', this.translate.instant('Not a valid number in B !'), 'error');
        return false;
      }
      const params = {
        ID_UNIT: this.idUnit,
        TYPE_UNIT: this.typeUnit,
        SYMBOL: this.valueUnitSymbol,
        COEFF_A: this.valueUnitCoeffA,
        COEFF_B: this.valueUnitCoeffB,
      };
      this.api.saveUnit(params).subscribe(
        data => {
          this.showModifyUnit = true;
          this.showNewUnit = false;
          this.symbolSelectSymbol = [];
          this.modalValueUnit.hide();
          this.refeshView();
        },
        (err) => {
          swal('Error', err.error.message, 'error');
          console.log(err);
        },
        () => {
        }
      );
    }
    if (this.modifyUnit == 0) {
      if (this.newUnitSymbol == '') {
        swal('Oops..', this.translate.instant('Enter a value in Symbol !'), 'error');
        return false;
      } else if (Number.isInteger(Math.floor(this.newUnitCoeffA)) === false) {
        swal('Oops..', this.translate.instant('Not a valid number in A !'), 'error');
        return false;
      } else if (Number.isInteger(Math.floor(this.newUnitCoeffB)) === false) {
        swal('Oops..', this.translate.instant('Not a valid number in B !'), 'error');
        return false;
      }
      const params = {
        TYPE_UNIT: this.typeUnit,
        SYMBOL: this.newUnitSymbol,
        COEFF_A: this.newUnitCoeffA,
        COEFF_B: this.newUnitCoeffB,
      };
      this.api.createUnit(params).subscribe(
        data => {
          this.showModifyUnit = true;
          this.showNewUnit = false;
          this.symbolSelectSymbol = [];
          this.newUnitSymbol = '';
          this.newUnitCoeffA = 1;
          this.newUnitCoeffB = 0;
          this.modalValueUnit.hide();
          this.refeshView();
        },
        (err) => {
          swal('Error', err.error.message, 'error');
          console.log(err);
        },
        () => {
        }
      );
    }
  }
}
