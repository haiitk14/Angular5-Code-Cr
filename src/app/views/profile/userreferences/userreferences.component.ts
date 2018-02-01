import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

import { ProfileService, ApiService } from '../../../api/services';
import { User, Translation, Constructors, Units, MonetaryCurrency, Langue, DefaultEquipment, Profile } from '../../../api/models';

@Component({
  selector: 'app-userreferences',
  templateUrl: './userreferences.component.html',
  styleUrls: ['./userreferences.component.scss']
})
export class UserreferencesComponent implements OnInit, AfterViewInit {
  @ViewChild('modalChangePassword') public modalChangePassword: ModalDirective;
  public isLoading = false;
  public isChange = false;
  public isSave = false;
  public userLogon: User;
  public pass = {
    oldPass: '',
    newPass: '',
    confPass: ''
  };
  public listEnergies: Translation;
  public listConstructors: Constructors;
  public listFamilies: Translation;
  public listOrigines: Translation;
  public listProcess: Translation;
  public listModels: Translation;
  public listUnits: Units;
  public listLang: Translation;
  public listMonetary: MonetaryCurrency;
  public langue: Langue;
  public defaultEquip: DefaultEquipment;
  public profile: Profile;

  constructor(private profileService: ProfileService, private toastr: ToastrService,
    private router: Router, private api: ApiService) {
    this.userLogon = JSON.parse(localStorage.getItem('user'));
    this.langue = new Langue();
    this.defaultEquip = new DefaultEquipment();
   }

  ngOnInit() {
    this.isLoading = true;
    this.langue.langId = this.userLogon.CODE_LANGUE;
    this.langue.monetaryId = this.userLogon.ID_MONETARY_CURRENCY;
    this.defaultEquip.energyId = this.userLogon.USER_ENERGY;
    this.defaultEquip.construct = this.userLogon.USER_CONSTRUCTOR;
    this.defaultEquip.familyId = this.userLogon.USER_FAMILY;
    this.defaultEquip.stdId = this.userLogon.USER_ORIGINE;
    this.defaultEquip.batchProcess = this.userLogon.USER_PROCESS;
    this.defaultEquip.equipseriesId = this.userLogon.USER_MODEL;
  }

  ngAfterViewInit() {
    this.isLoading = true;
    this.refrestListEnergies();
    this.refrestListConstructors();
    this.refrestListFamilies();
    this.refrestListOrigines();
    this.refrestListProcessType();
    this.refrestListModels();
    this.refrestListUnits();
    this.refrestListLang();
    this.refrestListMonetary();
  }

  changePassword() {
    if (this.pass.oldPass === '' || this.pass.oldPass === undefined) {
      swal('Oops..', 'Please specify old password !', 'warning');
      return;
    }
    if (this.pass.oldPass.length < 5 || this.pass.oldPass.length > 30) {
      swal('Oops..', 'Please old password ( 5 : 30 )', 'warning');
      return;
    }
    if (this.pass.newPass === '' || this.pass.newPass === undefined) {
      swal('Oops..', 'Please specify new password !', 'warning');
      return;
    }
    if (this.pass.newPass.length < 5 || this.pass.newPass.length > 30) {
      swal('Oops..', 'Please new password ( 5 : 30 )', 'warning');
      return;
    }
    if (this.pass.confPass === '' || this.pass.confPass === undefined) {
      swal('Oops..', 'Please specify confirm password !', 'warning');
      return;
    }
    if (this.pass.confPass.length < 5 || this.pass.confPass.length > 30) {
      swal('Oops..', 'Please confirm password ( 5 : 30 )', 'warning');
      return;
    }
    if (this.pass.newPass !== this.pass.confPass) {
      swal('Oops..', 'Password was different to the confirm password!', 'warning');
      return;
    }
    const body = {
      oldPass: this.pass.oldPass,
      newPass: this.pass.newPass
    };
    this.isChange = true;
    this.profileService.changePassword({
      id: this.userLogon.ID_USER,
      body: body
    }).subscribe(
      response => {
        let success = true;
        if (response === -1) {
          success = false;
        }

        if (success) {
          this.modalChangePassword.hide();
          this.toastr.success('Change password', 'successfully');
          this.router.navigate(['/auth/signin']);
          this.pass = {
            oldPass: '',
            newPass: '',
            confPass: ''
          };
        } else {
          swal('Oops..', 'Change password error!', 'error');
        }
        this.isChange = false;
      },
      err => {
        console.log(err);
      },
      () => {

      }
    );
  }

  refrestListEnergies() {
    this.profileService.getEnergies()
      .subscribe(
      data => {
        this.listEnergies = data;
        // console.log(data);
      },
      err => {
        console.log(err);
      },
      () => {

      }
      );
  }

  refrestListConstructors() {
    this.profileService.getConstructors()
      .subscribe(
      data => {
        this.listConstructors = data;
        // console.log(data);
      },
      err => {
        console.log(err);
      },
      () => {

      }
      );
  }

  refrestListFamilies() {
    const dataSend = {
      idCooling: 0,
      manufacturerLabel: ''
    };
    this.profileService.getFamilies(dataSend)
      .subscribe(
      data => {
        this.listFamilies = data;
      },
      err => {
        console.log(err);
      },
      () => {

      }
      );
  }

  refrestListOrigines() {
    const dataSend = {
      idCooling: 0,
      manufacturerLabel: '',
      idFamily: 0
    };
    this.profileService.getOrigines(dataSend)
      .subscribe(
      data => {
        this.listOrigines = data;
      },
      err => {
        console.log(err);
      },
      () => {

      }
      );
  }

  refrestListProcessType() {
    const dataSend = {
      idCooling: 0,
      manufacturerLabel: '',
      idFamily: 0,
      idStd: 0
    };
    this.profileService.getProcesses(dataSend)
      .subscribe(
      data => {
        this.listProcess = data;
      },
      err => {
        console.log(err);
      },
      () => {

      }
      );
  }

  refrestListModels() {
    const dataSend = {
      idCooling: 0,
      manufacturerLabel: '',
      idFamily: 0,
      idStd: 0,
      idProcess: 0
    };
    this.profileService.getModels(dataSend)
      .subscribe(
      data => {
        this.listModels = data;
      },
      err => {
        console.log(err);
      },
      () => {

      }
      );
  }

  refrestListLang() {
    this.profileService.getLangue()
      .subscribe(
      data => {
        this.listLang = data;
      },
      err => {
        console.log(err);
      },
      () => {

      }
      );
  }

  refrestListMonetary() {
    this.profileService.getMonetary()
      .subscribe(
      data => {
        this.listMonetary = data;
        this.isLoading = false;
      },
      err => {
        console.log(err);
      },
      () => {

      }
      );
  }

  refrestListUnits() {
    this.profileService.getUnits(this.userLogon.ID_USER)
      .subscribe(
      data => {
        this.listUnits = data;
        this.processNameUnits(this.listUnits);
      },
      err => {
        console.log(err);
      },
      () => {

      }
      );
  }

  processNameUnits(res) {
    for (let i = 0 ; i < res.length ; i++) {

      if (res[i].TYPE_UNIT === '1') { res[i].nameLabel = 'Fluid flow'; }

      if (res[i].TYPE_UNIT === '2') { res[i].nameLabel = 'Product flow'; }

      if (res[i].TYPE_UNIT === '3') { res[i].nameLabel = 'Length'; }

      if (res[i].TYPE_UNIT === '4') { res[i].nameLabel = 'Mass'; }

      if (res[i].TYPE_UNIT === '5') { res[i].nameLabel = 'Time'; }

      if (res[i].TYPE_UNIT === '6') { res[i].nameLabel = 'Specific Heat'; }

      if (res[i].TYPE_UNIT === '7') { res[i].nameLabel = 'Density'; }

      if (res[i].TYPE_UNIT === '8') { res[i].nameLabel = 'Temperature'; }

      if (res[i].TYPE_UNIT === '9') { res[i].nameLabel = 'Enthalpy'; }

      if (res[i].TYPE_UNIT === '10') { res[i].nameLabel = 'Conductivity'; }

      if (res[i].TYPE_UNIT === '11') { res[i].nameLabel = 'Losses in get cold (Line)'; }

      if (res[i].TYPE_UNIT === '12') { res[i].nameLabel = 'Permanent Heat losses (Line)'; }

      if (res[i].TYPE_UNIT === '13') { res[i].nameLabel = 'Convection speed'; }

      if (res[i].TYPE_UNIT === '14') { res[i].nameLabel = 'Convection coef'; }

      if (res[i].TYPE_UNIT === '15') { res[i].nameLabel = 'Pressure'; }

      if (res[i].TYPE_UNIT === '16') { res[i].nameLabel = 'Thickness packing'; }

      if (res[i].TYPE_UNIT === '17') { res[i].nameLabel = 'Line'; }

      if (res[i].TYPE_UNIT === '18') { res[i].nameLabel = 'LN2 tank capacity'; }

      if (res[i].TYPE_UNIT === '19') { res[i].nameLabel = 'Product dimension'; }

      if (res[i].TYPE_UNIT === '20') { res[i].nameLabel = 'Mesh cut'; }

      if (res[i].TYPE_UNIT === '21') { res[i].nameLabel = 'Equipment dimension'; }

      if (res[i].TYPE_UNIT === '22') { res[i].nameLabel = 'Carpet/Sieve width'; }

      if (res[i].TYPE_UNIT === '23') { res[i].nameLabel = 'Slopes position'; }

      if (res[i].TYPE_UNIT === '24') { res[i].nameLabel = 'Material Rise'; }

      if (res[i].TYPE_UNIT === '25') { res[i].nameLabel = 'CO2 tank capacity'; }

      if (res[i].TYPE_UNIT === '26') { res[i].nameLabel = 'Evaporation'; }

      if (res[i].TYPE_UNIT === '28') { res[i].nameLabel = 'Consumption unit'; }

      if (res[i].TYPE_UNIT === '29') { res[i].nameLabel = 'Consumption unit (LN2)'; }

      if (res[i].TYPE_UNIT === '30') { res[i].nameLabel = 'Consumption unit (CO2)'; }

      if (res[i].TYPE_UNIT === '31') { res[i].nameLabel = 'Heat losses per hour'; }

      if (res[i].TYPE_UNIT === '32') { res[i].nameLabel = 'Heat losses per hour (LN2)'; }

      if (res[i].TYPE_UNIT === '33') { res[i].nameLabel = 'Heat losses per hour (CO2)'; }

      if (res[i].TYPE_UNIT === '34') { res[i].nameLabel = 'Cooldown'; }

      if (res[i].TYPE_UNIT === '35') { res[i].nameLabel = 'Cooldown (LN2)'; }

      if (res[i].TYPE_UNIT === '36') { res[i].nameLabel = 'Cooldown (CO2)'; }

      if (res[i].TYPE_UNIT === '37') { res[i].nameLabel = 'unit of mass (consumption)'; }

      if (res[i].TYPE_UNIT === '38') { res[i].nameLabel = 'Product dimension - product chart'; }
    }
  }

  saveUnits() {
    const profile = {
      'Langue': this.langue,
      'DefaultEquipment': this.defaultEquip,
      'Units': this.listUnits
    };
    this.isSave = true;
    this.profileService.updateUnits({
      id: this.userLogon.ID_USER,
      body: profile
    }).subscribe(
      data => {
        let success = true;
        if (data !== 1) {
          success = false;
        }
        if (success) {
          this.toastr.success('Update profile', 'successfully');
          this.router.navigate(['/profile/userreferences']);
          this.refrestUser();
        } else {
          swal('Oops..', 'Update profile error!', 'error');
        }
        this.isSave = false;
      },
      err => {
        console.log(err);
        this.isSave = false;
      },
      () => {
        this.isSave = false;
      }
      );
  }

  refrestUser() {
    this.api.getUser(this.userLogon.ID_USER).subscribe(
      data => {
        this.userLogon = data;
        localStorage.setItem('user', JSON.stringify(data));
      },
      err => {
        console.log(err);
      },
      () => {

      }
      );
  }
}
