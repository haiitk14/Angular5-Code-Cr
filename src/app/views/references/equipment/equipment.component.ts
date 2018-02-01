import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OnChanges } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

import { ReferencedataService } from '../../../api/services/referencedata.service';
import { RefEquipment, ViewEquipment, NewEquipment } from '../../../api/models';
import { Equipment } from '../../../api/models/equipment';


@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit, AfterViewInit {
  @ViewChild('modalTempSetpoint') public modalTempSetpoint: ModalDirective;
  @ViewChild('modalReferentialEquip') public modalReferentialEquip: ModalDirective;
  @ViewChild('modalEquipmentProfil') public modalEquipmentProfil: ModalDirective;
  @ViewChild('modalEquipmentProfil2') public modalEquipmentProfil2: ModalDirective;
  @ViewChild('modalAddEquipment') public modalAddEquipment: ModalDirective;

  public equipmentGenerate: number;
  public equipmentMerge1: number;
  public equipmentMerge2: number;
  public equipmentLoad: number;

  public activePageEquipment = '';
  public listEquipment: ViewEquipment;
  public listEquipGenerateAll: Array<RefEquipment>;
  public listEquipGenerate: Array<RefEquipment>;
  public listEquipRotate: Array<RefEquipment>;
  public listEquipMeger1: Array<RefEquipment>;
  public listEquipMeger2: Array<RefEquipment>;
  public selectEquipGener: RefEquipment;
  public selectEquipRotate: RefEquipment;
  public selectEquipTranslate: RefEquipment;
  public selectEquipmentMerge1: RefEquipment;
  public selectEquipmentMerge2: RefEquipment;
  public statusEquip = 0;
  public equipGenerate = 0;
  public equipRotate = 0;
  public equipTranslation = 0;
  public equipMerge1 = 0;
  public equipMerge2 = 0;
  public newEquipment: NewEquipment;

  constructor(private referencedata: ReferencedataService, private toastr: ToastrService, private router: Router) {
    this.equipmentGenerate = 0;
    this.equipmentMerge1 = 0;
    this.equipmentMerge2 = 0;
    this.equipmentLoad = 0;
    this.newEquipment = new NewEquipment();
  }

  ngOnInit() {
    this.activePageEquipment = 'load';
  }

  ngAfterViewInit() {
    this.refrestListEquipment();
  }

  refrestListEquipment() {
    this.referencedata.findRefEquipment()
      .subscribe(
      data => {
        // console.log(data);
        this.listEquipment = data;
        this.listEquipGenerateAll = (data.mine).concat(data.others);
        this.listEquipGenerate = [];
        for (let i = 0; i < this.listEquipGenerateAll.length; i++) {
          if ( Number(this.listEquipGenerateAll[i].STD) === 1 && Number(this.listEquipGenerateAll[i].EQUIP_RELEASE) !== 5) {
            this.listEquipGenerate.push(this.listEquipGenerateAll[i]);
          }
        }
      },
      err => {
        console.log(err);
      },
      () => {

      }
    );
  }

  selectEquipGenerate() {
    for (const equip of this.listEquipGenerate) {
      if (Number(equip.ID_EQUIP) === Number(this.equipGenerate)) {
        this.selectEquipGener = equip;
        break;
      }
    }
  }

  selectEquipTranslation() {
    this.selectEquipTranslate = new RefEquipment();
    if (Number(this.equipTranslation) === 0) {
      this.selectEquipTranslate.NEW_POS = 0;
      this.selectEquipTranslate.DWELLING_TIME = 0;
    }
    for (const equip of this.listEquipRotate) {
      if (Number(equip.ID_EQUIP) === Number(this.equipTranslation)) {
        this.selectEquipTranslate = equip;
        break;
      }
    }
  }

  selectEquipMerge1() {
    for (const equip of this.listEquipMeger1) {
      if (Number(equip.ID_EQUIP) === Number(this.equipMerge1)) {
        this.selectEquipmentMerge1 = equip;
        break;
      }
    }
    if (Number(this.equipMerge1) === 0) {
      this.equipMerge2 = 0;
    }
  }

  selectEquipMerge2() {
    for (const equip of this.listEquipMeger1) {
      if (Number(equip.ID_EQUIP) === Number(this.equipMerge2)) {
        this.selectEquipmentMerge2 = equip;
        break;
      }
    }
  }

  chooseGenerate() {
    this.statusEquip = 0;
    this.selectEquipGener = new RefEquipment();
    this.equipGenerate = 0;
  }

  chooseTranslate() {
    this.statusEquip = 1;
    this.getEquipmentRotateTranslation();
    this.selectEquipTranslate = new RefEquipment();
    this.equipTranslation = 0;
  }

  chooseRotate() {
    this.statusEquip = 2;
    this.getEquipmentRotateTranslation();
    this.equipRotate = 0;
  }

  chooseMerge() {
    this.statusEquip = 3;
    this.getEquipmentMerge();
    this.equipMerge1 = 0;
    this.equipMerge2 = 0;
  }

  getEquipmentRotateTranslation() {
    this.listEquipRotate = [];
    for (let i = 0; i < this.listEquipGenerateAll.length; i++) {
      if ( Number(this.listEquipGenerateAll[i].STD) !== 1 && Number(this.listEquipGenerateAll[i].EQUIP_RELEASE) !== 5) {
        this.listEquipRotate.push(this.listEquipGenerateAll[i]);
      }
    }
  }

  getEquipmentMerge() {
    this.listEquipMeger1 = [];
    this.listEquipMeger2 = [];
    for (let i = 0; i < this.listEquipGenerateAll.length; i++) {
      if (Number(this.listEquipGenerateAll[i].EQUIP_RELEASE) !== 5) {
        this.listEquipMeger1.push(this.listEquipGenerateAll[i]);
        this.listEquipMeger2.push(this.listEquipGenerateAll[i]);
      }
    }
  }

  saveNewEquipment() {

    if (Number(this.statusEquip) === 0) {
      this.newEquipment.typeEquipment = this.statusEquip;
      this.newEquipment.equipmentId1 = this.selectEquipGener.ID_EQUIP;
      this.newEquipment.equipmentId2 = 0;
      this.newEquipment.newPos = 0;

      if (this.selectEquipGener.capabilitiesCalc) {
        this.newEquipment.dwellingTime = this.selectEquipGener.DWELLING_TIME;
        this.newEquipment.tempSetPoint = 0;
      } else {
        this.newEquipment.dwellingTime = 0;
        this.newEquipment.tempSetPoint = this.selectEquipGener.TEMP_SETPOINT;
      }
      this.referencedata.newEquipment(this.newEquipment).subscribe(
        response => {
          console.log(response);
        },
        err => {
          console.log(err);
        },
        () => {

        }
      );
    }



  }

  openLoadEquipment() {
    this.hideAllPageEquipment();
    const loadE = <HTMLElement>document.getElementById('page-load-equipment');
    loadE.style.display = 'block';
    this.activePageEquipment = 'load';
  }

  openGenerateEquipment() {
    this.hideAllPageEquipment();
    const genE = <HTMLElement>document.getElementById('page-generated-equipment');
    genE.style.display = 'block';
    this.activePageEquipment = 'gen';
  }

  openCurvesEquipment() {
    this.hideAllPageEquipment();
    const curE = <HTMLElement>document.getElementById('page-curves-equipment');
    curE.style.display = 'block';
    this.activePageEquipment = 'curves';
  }

  changeEquipmentLoad(val) {
    this.equipmentLoad = val;
    const pageEquip1 = <HTMLElement>document.getElementById('page-load-equipment1');
    const pageEquip2 = <HTMLElement>document.getElementById('page-load-equipment2');
    const pageEquip3 = <HTMLElement>document.getElementById('page-load-equipment3');
    if (val !== 0) {
      pageEquip1.style.display = 'block';
      pageEquip2.style.display = 'block';
      pageEquip3.style.display = 'block';
    } else {
      pageEquip1.style.display = 'none';
      pageEquip2.style.display = 'none';
      pageEquip3.style.display = 'none';
    }
  }

  hideAllPageEquipment() {
    const loadE = <HTMLElement>document.getElementById('page-load-equipment');
    const genE = <HTMLElement>document.getElementById('page-generated-equipment');
    const curE = <HTMLElement>document.getElementById('page-curves-equipment');
    loadE.style.display = 'none';
    genE.style.display = 'none';
    curE.style.display = 'none';

  }

  showGenerateRegulation() {
    const equip = <HTMLElement>document.getElementById('generate-regulation-temperature');
    if (this.equipmentGenerate !== 0) {
      equip.style.display = 'block';
    } else {
      equip.style.display = 'none';
    }
  }

  showMergeRegulation() {
    const equip = <HTMLElement>document.getElementById('merge-regulation-temperature');
    if (this.equipmentMerge1 !== 0 && this.equipmentMerge2 !== 0) {
      equip.style.display = 'block';
    } else {
      equip.style.display = 'none';
    }
  }

  pageGenerate() {
    this.hideAllPage();
    const gen = <HTMLElement>document.getElementById('equipment-page-generate');
    gen.style.display = 'block';
  }

  pageRotate() {
    this.hideAllPage();
    const rot = <HTMLElement>document.getElementById('equipment-page-rotate');
    rot.style.display = 'block';
  }

  pageTranslate() {
    this.hideAllPage();
    const tran = <HTMLElement>document.getElementById('equipment-page-translate');
    tran.style.display = 'block';
  }

  pageMerge() {
    this.hideAllPage();
    const mer = <HTMLElement>document.getElementById('equipment-page-merge');
    const btnFilter = <HTMLElement>document.getElementById('equipment-filter');
    mer.style.display = 'block';
    btnFilter.style.display = 'none';
  }

  hideAllPage() {
    const generate = <HTMLElement>document.getElementById('equipment-page-generate');
    const rotate = <HTMLElement>document.getElementById('equipment-page-rotate');
    const translate = <HTMLElement>document.getElementById('equipment-page-translate');
    const merge = <HTMLElement>document.getElementById('equipment-page-merge');
    const btnFilter = <HTMLElement>document.getElementById('equipment-filter');
    generate.style.display = 'none';
    rotate.style.display = 'none';
    translate.style.display = 'none';
    merge.style.display = 'none';
    btnFilter.style.display = 'block';
  }

}
