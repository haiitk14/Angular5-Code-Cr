import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { ApiService } from '../../../api/services/api.service';
import { TextService } from '../../../shared/text.service';
import { TranslateService } from '@ngx-translate/core';
import * as Models from '../../../api/models';

import swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit, AfterContentInit {
  @ViewChild('addEquipModal') public addEquipModal: ModalDirective;

  public isUpdatePrice = false;
  public isUpdateInterval = false;
  public  showTable = false;
  public study: Models.Study;
  public equipmentsView: Models.ViewStudyEquipment[];
  public laddaDeletingStudyEquip: boolean[];
  public laddaListingEquipments = false;
  public laddaAddingEquipment = false;
  public equipments: Models.Equipment[];

  constructor(private api: ApiService, private text: TextService, private translate: TranslateService, 
    private toastr: ToastrService, private router: Router) { }
  public selectedAddingEquipment: Models.Equipment;
  public filterString = '';
  public unitData: Models.UnitDataEquipment;
  public unitDataRes = {
    price: 0,
    intervalL: 0,
    intervalW: 0
  };

  ngOnInit() {
    this.study = null;
  }

  deleteStudyEquipment(equip: Models.StudyEquipment, index: number) {
    this.laddaDeletingStudyEquip[index] = true;
    this.api.removeStudyEquipment({
      id: this.study.ID_STUDY,
      idEquip: equip.ID_STUDY_EQUIPMENTS
    }).subscribe(
      (resp) => {
        this.refreshView();
      },
      (err) => {
        this.laddaDeletingStudyEquip[index] = false;
        swal('Error', 'Failed to remove equipment, please check your internet connection and' +
          ' try again, contact administrators if error is persist.', 'warning');

        console.log(err);
      },
      () => {
        this.laddaDeletingStudyEquip[index] = false;

      }
    );
  }

  recalculateEquipment() {
    swal('Warning', 'This feature is not yet implement', 'warning');
  }

  refreshView() {
    this.api.getStudyEquipments(this.study.ID_STUDY).subscribe(
      (equips: Models.ViewStudyEquipment[]) => {
        this.laddaDeletingStudyEquip = new Array<boolean>(equips.length);
        this.laddaDeletingStudyEquip.fill(false);
        this.equipmentsView = equips;
        console.log(this.equipmentsView);
      },
      (err) => {
        console.log(err);
      },
      () => {
      }
    );
  }

  ngAfterContentInit() {
    this.study = JSON.parse(localStorage.getItem('study'));

    this.refreshView();
    this.getUnitData();
  }

  onAddEquip() {
    if (!this.selectedAddingEquipment) {
      swal('Error', 'Please select an equipment!', 'error');
      return;
    }

    this.laddaAddingEquipment = true;
    this.api.addEquipment({
      id: this.study.ID_STUDY,
      idEquip: this.selectedAddingEquipment.ID_EQUIP
    }).subscribe(
      resp => {
        this.refreshView();
        this.laddaAddingEquipment = false;
        this.addEquipModal.hide();
      },
      err => {
        console.log(err);
        this.laddaAddingEquipment = false;
        this.addEquipModal.hide();
      },
      () => {
        this.laddaAddingEquipment = false;
        this.addEquipModal.hide();
      }
    );
  }

  onShowAddEquip() {
    if (!this.equipments || this.equipments.length == 0) {
      this.laddaListingEquipments = true;
      this.api.getEquipments({}).subscribe(
        (resp: Models.Equipment[]) => {
          this.equipments = resp;
          this.laddaListingEquipments = false;
          this.addEquipModal.show();
        },
        err => {
          this.laddaListingEquipments = false;
          console.log(err);
        },
        () => {
          this.laddaListingEquipments = false;
        }
      );
    } else {
      this.addEquipModal.show();
    }
  }

  onSelectAddingEquipment(equip: Models.Equipment) {
    this.selectedAddingEquipment = equip;
  }

  showPageGas() {
    this.showTable = !this.showTable;
    const table = <HTMLElement> document.getElementById('tableGas');
    if (this.showTable) {
      table.style.display = 'block';
    } else {
      table.style.display = 'none';
    }
  }

  getUnitData() {
    this.api.getUnitData(this.study.ID_STUDY).subscribe(
      resp => {
        this.unitData = resp;
        this.unitDataRes.price = resp.Price;
        this.unitDataRes.intervalL = resp.IntervalLength;
        this.unitDataRes.intervalW = resp.IntervalWidth;
      },
      err => {
        console.log(err);
      },
      () => {

      }
    );
  }

  refreshPrice() {
    this.unitData.Price = this.unitDataRes.price;
  }

  refreshIntervalLW() {
    this.unitData.IntervalLength = this.unitDataRes.intervalL;
    this.unitData.IntervalWidth = this.unitDataRes.intervalW;
  }

  savePrice() {
    // console.log(this.unitData);
    if (!isNumber(this.unitData.Price)) {
      swal('Oops..', 'Please specify Price !', 'warning');
      return;
    }
    this.isUpdatePrice = true;
    this.api.updatePrice({
      id: this.study.ID_STUDY,
      price: this.unitData.Price }).subscribe(
      resp => {
        if (resp === 1) {
          this.toastr.success('Update price', 'successfully');
          this.router.navigate(['/input/equipment']);
          this.getUnitData();
          this.isUpdatePrice = false;
        } else {
          swal('Oops..', 'Update price error!', 'error');
        }
      },
      err => {
        console.log(err);
        this.isUpdatePrice = false;
      },
      () => {
        this.isUpdatePrice = false;
      }
    );
  }

  saveInterval() {
    if (!isNumber(this.unitData.IntervalLength)) {
      swal('Oops..', 'Please specify Lenght !', 'warning');
      return;
    }
    if (!isNumber(this.unitData.IntervalWidth)) {
      swal('Oops..', 'Please specify Width !', 'warning');
      return;
    }
    this.isUpdateInterval = true;
    this.api.updateInterval({
      id: this.study.ID_STUDY,
      lenght: this.unitData.IntervalLength,
      width: this.unitData.IntervalWidth
    }).subscribe(
      resp => {
        if (resp === 1) {
          this.toastr.success('Update interval Lenght Width', 'successfully');
          this.router.navigate(['/input/equipment']);
          this.getUnitData();
          this.isUpdateInterval = false;

          // >>>>>>>>>>> Recalculate equipment parameter <<<<<<<<<<<<<<<

        } else {
          swal('Oops..', 'Update interval Lenght Width error!', 'error');
        }
      },
      err => {
        console.log(err);
        this.isUpdateInterval = false;
      },
      () => {
        this.isUpdateInterval = false;
      }
    );
  }
}
