import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { ReferencedataService } from '../../../api/services/referencedata.service';
import { ApiService } from '../../../api/services';
import { Translation, ViewComponent, VComponent, ViewTemperature, MyComponent, Compenth } from '../../../api/models';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { isNumber, isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Math } from 'three';

@Pipe({ name: 'ComponentFilter' })
export class ComponentFilterPipe implements PipeTransform {
  public transform(values: VComponent[], filter: string): any[] {
    if (!values || !values.length) {
      return [];
    }
    if (!filter) {
      return values;
    }

    return values.filter(
      v => v.LABEL.toLowerCase().indexOf(
        filter.toLowerCase()) >= 0);
  }
}

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  @ViewChild('modalFreezetemper') public modalFreezetemper: ModalDirective;
  @ViewChild('modalDeleteComponent') public modalDeleteComponent: ModalDirective;
  @ViewChild('modalSaveAsComponent') public modalSaveAsComponent: ModalDirective;
  @ViewChild('modalAddComponent') modalAddComponent;
  @ViewChild('displayCTComponent') displayCTComponent;
  public activePageComponent = '';
  public listFamily: Object;
  public listSubFamily: Object;
  public dataComponent: ViewComponent;
  public components: MyComponent;
  public fieldArray: Array<ViewTemperature>;
  public newAttribute: any = {};
  public isLoading = false;
  public selectComponent: VComponent;
  public filterString = '';
  public laddaIsCalculating = false;
  public laddaIsFreeze = false;
  public compenths: Array<Compenth>;
  public dataCompenth: Compenth;
  public total = 0;

  public generatedData: {
    isCalculated?: boolean,
    idComp?: number,
  };

  constructor(private api: ApiService, private apiReference: ReferencedataService,
    private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.activePageComponent = 'new';
    this.isLoading = true;
    this.getDataComponent(0);
    this.getMyComponent();
    // this.generatedData = JSON.parse(localStorage.getItem('generatedData'));
  }

  openNewComponent() {
    this.hideAllPageComponent();
    const newC = <HTMLElement>document.getElementById('page-new-component');
    this.activePageComponent = 'new';
    newC.style.display = 'block';
  }

  openDataGenerateComponent() {
    this.hideAllPageComponent();
    const dataGen = <HTMLElement>document.getElementById('page-datagenerated-component');
    dataGen.style.display = 'block';
    this.activePageComponent = 'gen';
  }

  hideAllPageComponent() {
    const newC = <HTMLElement>document.getElementById('page-new-component');
    const dataGen = <HTMLElement>document.getElementById('page-datagenerated-component');
    newC.style.display = 'none';
    dataGen.style.display = 'none';
  }

  getDataComponent(compfamily) {
    this.isLoading = true;
   this.apiReference.getDataComponent(compfamily).subscribe(
     data => {
      this.dataComponent = data;
      console.log(data);
      this.isLoading = false;
     },
     err => {
       this.isLoading = false;
     },
     () => {

     }
   );
  }

  getMyComponent() {
    this.isLoading = true;
    this.apiReference.getMyComponent().subscribe(
      data => {
        this.components = data;
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  onSelectComponent(comp) {
    this.selectComponent = comp;
    console.log(comp);
  }

  onGetTemperature(comp) {
    this.apiReference.getTemperaturesByIdComp(comp.ID_COMP).subscribe(
      data => {
        this.fieldArray = data;
        console.log(data);
      },
      err => {

      },
      () => {

      }
    );
  }

  deleteComponent(comp) {
    swal({
      title: 'Are you sure?',
      text: 'You won`t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.apiReference.deleteComponent(comp.ID_COMP).subscribe(
          response => {
            console.log(response);
            if (response === 1) {
              this.toastr.success('Delete component', 'successfully');
            } else {
              swal('Oops..', 'Delete component error!', 'error');
            }
          },
          err => {
            console.log(err);
          },
          () => {
            this.refrestComponent();
          }
        );
      }
    });
  }

  onResetData() {
    this.fieldArray = [];
  }

  addFieldValue() {
    if (!this.newAttribute.temperature) {
      swal('Oops..', 'Enter a value in Temperature !', 'error');
      return;
    }

    if (!isNumber(this.newAttribute.temperature)) {
      swal('Oops..', 'Not a valid number in Temperature !', 'error');
      return;
    }

    for (let i = 0; i < this.fieldArray.length; i++) {
      const element = this.fieldArray[i].temperature;
      if (Number(element) === Number(this.newAttribute.temperature)) {
        swal('Oops..', 'Temperature already exists !', 'error');
        return;
      }
    }

    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  saveDataComponent() {
    this.apiReference.saveDataComponent({
      PRODUCT_TYPE: this.dataComponent.PRODUCT_TYPE,
      SUB_TYPE: this.dataComponent.SUB_TYPE,
      NATURE_TYPE: this.dataComponent.NATURE_TYPE,
      CONDUCT_TYPE: this.dataComponent.CONDUCT_TYPE,
      FATTYPE: this.dataComponent.FATTYPE,
      COMP_NAME: this.dataComponent.COMP_NAME,
      AIR: this.dataComponent.AIR,
      CLASS_TYPE: this.dataComponent.CLASS_TYPE,
      COMP_COMMENT: this.dataComponent.COMP_COMMENT,
      COMP_VERSION: this.dataComponent.COMP_VERSION,
      FREEZE_TEMP: this.dataComponent.FREEZE_TEMP,
      PROTID: this.dataComponent.PROTID,
      LIPID: this.dataComponent.LIPID,
      GLUCID: this.dataComponent.GLUCID,
      SALT: this.dataComponent.SALT,
      NON_FROZEN_WATER: this.dataComponent.NON_FROZEN_WATER,
      release: this.dataComponent.release,
      Temperatures: this.fieldArray,
    }).subscribe(
      response => {
        let success = true;

        if (response === -2) {
          success = false;
          this.toastr.error('Create component', 'Please, select the components family!');
          return;
        }

        if (response === -3) {
          success = false;
          this.toastr.error('Create component', 'Component name can not be null!');
          return;
        }

        if (response === -4) {
          success = false;
          this.toastr.error('Create component', 'Name and version already in use!');
          return;
        }

        if (success) {
          this.toastr.success('Create component', 'successfully');
          this.modalAddComponent.hide();
          this.refrestComponent();
        } else {
          this.toastr.error('Create component', 'Error');
        }
      },
      err => {

      },
      () => {
      }
    );
  }

  saveAsComponent(comp) {
    this.apiReference.saveDataComponent({
      COMP_NAME_NEW: this.dataComponent.COMP_NAME_NEW,
      COMP_VERSION_NEW: this.dataComponent.COMP_VERSION_NEW,
      PRODUCT_TYPE: comp.CLASS_TYPE,
      SUB_TYPE: comp.SUB_FAMILY,
      NATURE_TYPE: comp.COMP_NATURE,
      CONDUCT_TYPE: comp.COND_DENS_MODE,
      FATTYPE: comp.FAT_TYPE,
      COMP_NAME: comp.LABEL,
      AIR: comp.AIR,
      CLASS_TYPE: comp.CLASS_TYPE,
      COMP_COMMENT: comp.COMP_COMMENT,
      COMP_VERSION: comp.COMP_VERSION,
      FREEZE_TEMP: comp.FREEZE_TEMP,
      PROTID: comp.PROTID,
      LIPID: comp.LIPID,
      GLUCID: comp.GLUCID,
      SALT: comp.SALT,
      NON_FROZEN_WATER: comp.NON_FROZEN_WATER,
      release: this.dataComponent.release,
      Temperatures: this.fieldArray,
    }).subscribe(
      response => {
        let success = true;

        if (response === -2) {
          success = false;
          this.toastr.error('Save as', 'Please, select the components family!');
          return;
        }

        if (response === -3) {
          success = false;
          this.toastr.error('Save as', 'Component name can not be null!');
          return;
        }

        if (response === -4) {
          success = false;
          this.toastr.error('Save as', 'Name and version already in use!');
          return;
        }

        if (success) {
          this.toastr.success('Save as component', 'successfully');
          this.modalSaveAsComponent.hide();
          this.refrestComponent();
        } else {
          this.toastr.error('Save as component', 'Error');
        }
      },
      err => {

      },
      () => {
      }
    );
  }

  getGeneratedData(comp) {
    this.apiReference.getCompenthsByIdComp(comp.ID_COMP).subscribe(
      data => {
        this.compenths = data;
      }
    );
  }

  getElementCompenth(compenth) {
    this.apiReference.getCompenthById(compenth.ID_COMPENTH).subscribe(
      data => {
        data.ID_COMP = Number(data.ID_COMP);
        this.dataCompenth = data;
        console.log(data);
      }
    );
    this.displayCTComponent.show();
  }

  refreshCompenth(id) {
    this.apiReference.getCompenthsByIdComp(id).subscribe(
      data => {
        this.compenths = data;
      }
    );
  }

  updateCompenth(compenth) {
    this.apiReference.updateCompenth({
      ID_COMPENTH: this.dataCompenth.ID_COMPENTH,
      ID_COMP: Number(this.dataCompenth.ID_COMP),
      COMPTEMP: this.dataCompenth.COMPTEMP,
      COMPCOND: this.dataCompenth.COMPCOND,
      COMPDENS: this.dataCompenth.COMPDENS,
      COMPENTH: this.dataCompenth.COMPENTH
    }).subscribe(
      response => {
        if (response === 1) {
          this.toastr.success('update compenth', 'successfully');
          this.refreshCompenth(Number(this.dataCompenth.ID_COMP));
          this.displayCTComponent.hide();
        } else {
          this.toastr.error('update compenth', 'ERROR');
        }
      }
    );
  }

  awakeComponent(comp, type: number) {
    this.apiReference.saveDataComponent({
      COMP_NAME_NEW: this.dataComponent.COMP_NAME_NEW,
      COMP_VERSION_NEW: this.dataComponent.COMP_VERSION_NEW,
      PRODUCT_TYPE: comp.CLASS_TYPE,
      SUB_TYPE: comp.SUB_FAMILY,
      NATURE_TYPE: comp.COMP_NATURE,
      CONDUCT_TYPE: comp.COND_DENS_MODE,
      FATTYPE: comp.FAT_TYPE,
      COMP_NAME: comp.LABEL,
      AIR: comp.AIR,
      CLASS_TYPE: comp.CLASS_TYPE,
      COMP_COMMENT: comp.COMP_COMMENT,
      COMP_VERSION: comp.COMP_VERSION,
      FREEZE_TEMP: comp.FREEZE_TEMP,
      PROTID: comp.PROTID,
      LIPID: comp.LIPID,
      GLUCID: comp.GLUCID,
      SALT: comp.SALT,
      NON_FROZEN_WATER: comp.NON_FROZEN_WATER,
      release: this.dataComponent.release,
      Temperatures: this.fieldArray,
      TYPE_COMP: type
    }).subscribe(
      response => {
        let success = true;

        if (response === -2) {
          success = false;
          this.toastr.error('Awake', 'Please, select the components family!');
          return;
        }

        if (response === -3) {
          success = false;
          this.toastr.error('Awake', 'Component name can not be null!');
          return;
        }

        if (response === -4) {
          success = false;
          this.toastr.error('Awake', 'Name and version already in use!');
          return;
        }

        if (success) {
          this.toastr.success('Awake component', 'successfully');
          this.modalSaveAsComponent.hide();
          this.refrestComponent();
        } else {
          this.toastr.error('Awake component', 'Error');
        }
      },
      err => {

      },
      () => {
      }
    );
  }

  refrestComponent() {
    this.getMyComponent();
  }

  runCalculateFreeze(idComp) {
    this.laddaIsFreeze = true;
    this.apiReference.calculateFreeze({
      PRODUCT_TYPE: this.dataComponent.PRODUCT_TYPE,
      SUB_TYPE: this.dataComponent.SUB_TYPE,
      NATURE_TYPE: this.dataComponent.NATURE_TYPE,
      CONDUCT_TYPE: this.dataComponent.CONDUCT_TYPE,
      FATTYPE: this.dataComponent.FATTYPE,
      COMP_NAME: this.dataComponent.COMP_NAME,
      AIR: this.dataComponent.AIR,
      CLASS_TYPE: this.dataComponent.CLASS_TYPE,
      COMP_COMMENT: this.dataComponent.COMP_COMMENT,
      COMP_VERSION: this.dataComponent.COMP_VERSION,
      FREEZE_TEMP: this.dataComponent.FREEZE_TEMP,
      PROTID: this.dataComponent.PROTID,
      LIPID: this.dataComponent.LIPID,
      GLUCID: this.dataComponent.GLUCID,
      SALT: this.dataComponent.SALT,
      NON_FROZEN_WATER: this.dataComponent.NON_FROZEN_WATER,
      release: this.dataComponent.release,
      Temperatures: this.fieldArray,
      ID_COMP: idComp
    }).subscribe(
      response => {
        this.laddaIsFreeze = false;
        let success = true;

        if (response === 2) {
          success = false;
          this.toastr.error('Create component', 'Please, select the components family!');
          return;
        }

        if (response === 3) {
          success = false;
          this.toastr.error('Create component', 'Component name can not be null!');
          return;
        }

        if (response !== 0) {
          success = false;
        }

        if (success) {
          this.toastr.success('Freeze temperature', 'successfully');
        } else {
          this.toastr.error('Freeze temperature', 'Run freeze temperature false');
        }
      },
      err => {
        this.laddaIsFreeze = false;
      },
      () => {
        this.laddaIsFreeze = false;
      }
    );
  }

  runCalculate(comp) {
    this.laddaIsCalculating = true;
    this.apiReference.startFCCalculate({
      ID_COMP: comp.ID_COMP,
      PRODUCT_TYPE: comp.CLASS_TYPE,
      SUB_TYPE: comp.SUB_FAMILY,
      NATURE_TYPE: comp.COMP_NATURE,
      CONDUCT_TYPE: comp.COND_DENS_MODE,
      FATTYPE: comp.FAT_TYPE,
      COMP_NAME: comp.LABEL,
      COMP_RELEASE: comp.COMP_RELEASE,
      AIR: comp.AIR,
      CLASS_TYPE: comp.CLASS_TYPE,
      COMP_COMMENT: comp.COMP_COMMENT,
      COMP_VERSION: comp.COMP_VERSION,
      FREEZE_TEMP: comp.FREEZE_TEMP,
      PROTID: comp.PROTID,
      LIPID: comp.LIPID,
      GLUCID: comp.GLUCID,
      SALT: comp.SALT,
      NON_FROZEN_WATER: comp.NON_FROZEN_WATER,
      Temperatures: this.fieldArray,
    }).subscribe(
      response => {
        this.laddaIsCalculating = false;
        if (response === 0) {
          // localStorage.setItem('generatedData', JSON.stringify({ isCalculated: true, idComp: comp.ID_COMP}));
          this.toastr.success('Calculation', 'successfully');
        } else {
          this.toastr.error('Calculation', 'ERROR!');
        }
      },
      err => {
        this.laddaIsCalculating = false;
      },
      () => {
        this.laddaIsCalculating = false;
      }
    );
  }
}
