import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { ReferencedataService } from '../../../api/services/referencedata.service';
import { PackingElmt, ViewPackingElmt, NewPacking, User } from '../../../api/models';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

@Pipe({ name: 'packingElmtFilter' })
export class PackingElmtFilterPipe implements PipeTransform {
  public transform(values: PackingElmt[], filter: string): any[] {
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
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.scss']
})
export class PackingComponent implements OnInit, AfterViewInit {
  @ViewChild('modalAddPackingElmt') public modalAddPackingElmt: ModalDirective;
  @ViewChild('modalSaveAs') public modalSaveAs: ModalDirective;
  public filterString = '';
  public isAddPacking = false;
  public isDeletePacking = false;
  public isUpdatePacking = false;
  public isSaveAs = false;
  public isLoading = false;
  public listPackingElmts: ViewPackingElmt;
  public selectPackingElmt: PackingElmt;
  public newPackingElmt: NewPacking;
  public updatePackingElmt: NewPacking;
  public userLogon: User;
  public packingSaveAs = {
    newName: '',
    newVersion: 0
  };

  constructor(private referencedata: ReferencedataService, private toastr: ToastrService, private router: Router) {
    this.newPackingElmt = new NewPacking();
    this.updatePackingElmt = new NewPacking();
    this.userLogon = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.isLoading = true;
  }

  ngAfterViewInit() {
    this.refrestListPackingElmt();
  }

  onSelectPackingElmt(packingElmt) {
    this.selectPackingElmt = packingElmt;
    this.updatePackingElmt.name = packingElmt.LABEL;
    this.updatePackingElmt.version = packingElmt.PACKING_VERSION;
    this.updatePackingElmt.conductivity = packingElmt.PACKINGCOND;
    this.updatePackingElmt.comment = packingElmt.PACKING_COMMENT;
    this.updatePackingElmt.release = packingElmt.PACKING_RELEASE;
    // console.log(this.selectPackingElmt);
  }

  refrestListPackingElmt() {
    this.isLoading = true;
    this.referencedata.findRefPackingElmt()
      .subscribe(
      data => {
        // console.log(data);
        this.listPackingElmts = data;
        this.isLoading = false;
      },
      err => {
        console.log(err);
      },
      () => {

      }
      );
  }

  newPacking() {
    if (!this.newPackingElmt.name || this.newPackingElmt.name === undefined) {
      swal('Oops..', 'Please specify name!', 'warning');
      return;
    }
    if (typeof this.newPackingElmt.name === 'number') {
      swal('Oops..', 'Not a valid string in Name !', 'warning');
      return;
    }
    if (!this.newPackingElmt.version) {
      swal('Oops..', 'Please specify version!', 'warning');
      return;
    }
    if (isNaN(this.newPackingElmt.version)) {
      swal('Oops..', 'Not a valid number in Version !', 'warning');
      return;
    }
    if (!this.newPackingElmt.conductivity) {
      swal('Oops..', 'Please specify Lambda thermal conductivity!', 'warning');
      return;
    }
    if (isNaN(this.newPackingElmt.conductivity)) {
      swal('Oops..', 'Not a valid number in Lambda thermal conductivity !', 'warning');
      return;
    }
    if (!this.newPackingElmt.release) {
      swal('Oops..', 'Please choose status !', 'warning');
      return;
    }
    if (!this.newPackingElmt.comment) {
      this.newPackingElmt.comment = '';
    }
    this.isAddPacking = true;
    this.referencedata.newPacking(this.newPackingElmt).subscribe(
      response => {
        let success = true;
        if (response === 0) {
          success = false;
        }

        if (success) {
          this.modalAddPackingElmt.hide();
          this.toastr.success('Create user', 'successfully');
          this.router.navigate(['/references/packing']);
          this.refrestListPackingElmt();
        } else {
          swal('Oops..', 'Create user error!', 'error');
        }
        this.isAddPacking = false;
      },
      err => {
        this.isAddPacking = false;
      },
      () => {
        this.isAddPacking = false;
        this.newPackingElmt = new NewPacking();
      }
    );
  }

  deletePacking(packing) {
    this.isDeletePacking = true;
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
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        this.referencedata.deletePacking(packing.ID_PACKING_ELMT)
        .subscribe(
        data => {
          this.isDeletePacking = false;
          this.toastr.success('Delete packing', 'successfully');
        },
        err => {
          console.log(err);
          this.isDeletePacking = false;
        },
        () => {
          this.refrestListPackingElmt();
          this.isDeletePacking = false;
          this.updatePackingElmt = new NewPacking();
          this.selectPackingElmt = new PackingElmt();
        }
        );
      }
    });
  }

  updatePacking (packing) {
    if (!packing.name || packing.name === undefined) {
      swal('Oops..', 'Please specify name!', 'warning');
      return;
    }
    if (typeof packing.name === 'number') {
      swal('Oops..', 'Not a valid string in Name !', 'warning');
      return;
    }
    if (!packing.version) {
      swal('Oops..', 'Please specify version!', 'warning');
      return;
    }
    if (isNaN(packing.version)) {
      swal('Oops..', 'Not a valid number in Version !', 'warning');
      return;
    }
    if (!packing.conductivity) {
      swal('Oops..', 'Please specify Lambda thermal conductivity!', 'warning');
      return;
    }
    if (isNaN(packing.conductivity)) {
      swal('Oops..', 'Not a valid number in Lambda thermal conductivity !', 'warning');
      return;
    }
    if (!packing.release) {
      swal('Oops..', 'Please choose status !', 'warning');
      return;
    }
    if (!packing.comment) {
      packing.comment = '';
    }
    const body = {
      name: packing.name,
      version: packing.version,
      conductivity: packing.conductivity,
      comment: packing.comment,
      release: packing.release
    };
    this.isUpdatePacking = true;
    this.referencedata.updatePacking({
      id: this.selectPackingElmt.ID_PACKING_ELMT,
      body: body
    }).subscribe(
      response => {
        let success = true;
        for (let i = 0; i < response.length; i++) {
          const element = response[i];
          if (element !== 1) {
            success = false;
            break;
          }
        }
        if (success) {
          this.toastr.success('Update packing', 'successfully');
          this.router.navigate(['/references/packing']);
        } else {
          swal('Oops..', 'Update packing error!', 'error');
        }
        this.isUpdatePacking = false;
      },
      err => {
        this.isUpdatePacking = false;
      },
      () => {
        this.refrestListPackingElmt();
        this.updatePackingElmt = new NewPacking();
        this.selectPackingElmt = new PackingElmt();
        this.isUpdatePacking = false;
      }
    );
  }

  saveAsPacking (oldPacking) {
    const body = {
      name: this.packingSaveAs.newName,
      version: this.packingSaveAs.newVersion
    };
    this.isSaveAs = true;
    this.referencedata.saveAsPacking({
      id: oldPacking.ID_PACKING_ELMT,
      body: body
    })
      .subscribe(
        response => {
        let success = true;
        if (response === 0) {
          success = false;
        }

        if (success) {
          this.modalSaveAs.hide();
          this.toastr.success('Save as success !', 'successfully');
          this.router.navigate(['/references/packing']);
          this.refrestListPackingElmt();
          this.updatePackingElmt = new NewPacking();
          this.packingSaveAs = {
            newName: '',
            newVersion: 0
          };
        } else {
          swal('Oops..', 'Save as packing error!', 'error');
        }
        this.isSaveAs = false;
      },
      err => {
        console.log(err);
        this.isSaveAs = false;
      },
      () => {
        this.isSaveAs = false;
      }
      );
  }
}
