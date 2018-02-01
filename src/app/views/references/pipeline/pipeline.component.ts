import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

import { ReferencedataService } from '../../../api/services/referencedata.service';
import { ApiService } from '../../../api/services';
import { PipeLineElmt, ViewPipeLineElmt, Translation } from '../../../api/models';
import { User } from '../../../api/models/user';

@Pipe({ name: 'pipeLineFilter' })
export class PipeLineFilterPipe implements PipeTransform {
  public transform(values: PipeLineElmt[], filter: string): any[] {
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
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.scss']
})
export class PipelineComponent implements OnInit, AfterViewInit {
  @ViewChild('modalAddPipeLine') public modalAddPipeLine: ModalDirective;
  @ViewChild('modalSaveAs') public modalSaveAs: ModalDirective;
  public isAddLine = false;
  public isDeletePipeLine = false;
  public isUpdatePipeLine = false;
  public isSaveAs = false;
  public isLoading = false;
  public pipelineType: number;
  public listPipeLines: ViewPipeLineElmt;
  public filterString = '';
  public selectLine: PipeLineElmt;
  public listLineType: Translation;
  public listEnergies: Translation;
  public newPipeLine: PipeLineElmt;
  public updatePipeLine: PipeLineElmt;
  public userLogon: User;
  public pipeLineSaveAs = {
    newName: ''
  };

  constructor(private referencedata: ReferencedataService, private toastr: ToastrService,
    private router: Router, private api: ApiService) {
    this.pipelineType = 1;
    this.newPipeLine = new PipeLineElmt();
    this.userLogon = JSON.parse(localStorage.getItem('user'));
    this.updatePipeLine = new PipeLineElmt();
  }

  ngOnInit() {
    this.isLoading = true;
    this.newPipeLine.ELT_TYPE = 1;
    this.newPipeLine.ID_COOLING_FAMILY = 2;
    this.newPipeLine.INSULATION_TYPE = 1;
  }

  ngAfterViewInit() {
    this.refrestListLineElmt();
    this.getListLineType();
    this.getListEnergies();
  }

  refrestListLineElmt() {
    this.isLoading = true;
    this.referencedata.findRefPipeline()
      .subscribe(
      data => {
        this.listPipeLines = data;
        this.isLoading = false;
      },
      err => {
        console.log(err);
      },
      () => {

      }
      );
  }

  getListLineType() {
    this.api.getListLineType()
      .subscribe(
      data => {
        this.listLineType = data;
      },
      err => {
        console.log(err);
      },
      () => {

      }
      );
  }

  getListEnergies() {
    this.api.getListEnergies()
      .subscribe(
      data => {
        this.listEnergies = data;
      },
      err => {
        console.log(err);
      },
      () => {

      }
      );
  }

  onSelectPipeLine(line) {
    this.selectLine = line;
    this.updatePipeLine.LABEL = line.LABEL;
    this.updatePipeLine.LINE_VERSION = line.LINE_VERSION;
    this.updatePipeLine.LINE_COMMENT = line.LINE_COMMENT;
    this.updatePipeLine.MANUFACTURER = line.MANUFACTURER;
    this.updatePipeLine.ELT_TYPE = line.ELT_TYPE;
    this.updatePipeLine.ID_COOLING_FAMILY = line.ID_COOLING_FAMILY;
    this.updatePipeLine.INSULATION_TYPE = line.INSULATION_TYPE;
    this.updatePipeLine.ELMT_PRICE = line.ELMT_PRICE;
    this.updatePipeLine.ELT_SIZE = line.ELT_SIZE;
    this.updatePipeLine.ELT_LOSSES_1 = line.ELT_LOSSES_1;
    this.updatePipeLine.ELT_LOSSES_2 = line.ELT_LOSSES_2;
    this.updatePipeLine.LINE_RELEASE = line.LINE_RELEASE;
  }

  savePipeLine() {
    // console.log(this.newPipeLine);
    if (!this.newPipeLine.LABEL || this.newPipeLine.LABEL === undefined) {
      swal('Oops..', 'Please specify name!', 'warning');
      return;
    }
    if (typeof this.newPipeLine.LABEL === 'number') {
      swal('Oops..', 'Not a valid string in Name !', 'warning');
      return;
    }
    if (!this.newPipeLine.LINE_VERSION) {
      swal('Oops..', 'Please specify version!', 'warning');
      return;
    }
    if (isNaN(this.newPipeLine.LINE_VERSION)) {
      swal('Oops..', 'Not a valid number in Version !', 'warning');
      return;
    }
    if (!this.newPipeLine.ELMT_PRICE || this.newPipeLine.ELMT_PRICE === undefined) {
      swal('Oops..', 'Not a valid number in Price !', 'warning');
      return;
    }
    if (isNaN(this.newPipeLine.ELMT_PRICE)) {
      swal('Oops..', 'Not a valid number in Price !', 'warning');
      return;
    }
    if (!this.newPipeLine.ELT_SIZE || this.newPipeLine.ELT_SIZE === undefined) {
      swal('Oops..', 'Not a valid number in Size !', 'warning');
      return;
    }
    if (isNaN(this.newPipeLine.ELT_SIZE)) {
      swal('Oops..', 'Not a valid number in Size !', 'warning');
      return;
    }
    if (!this.newPipeLine.LINE_RELEASE) {
      swal('Oops..', 'Please choose status !', 'warning');
      return;
    }
    if (this.newPipeLine.ELT_LOSSES_1 === undefined || !this.newPipeLine.ELT_LOSSES_1) {
      this.newPipeLine.ELT_LOSSES_1 = 0;
    }
    if (this.newPipeLine.ELT_LOSSES_2 === undefined || !this.newPipeLine.ELT_LOSSES_2) {
      this.newPipeLine.ELT_LOSSES_2 = 0;
    }
    if (this.newPipeLine.MANUFACTURER === undefined || !this.newPipeLine.MANUFACTURER) {
      this.newPipeLine.MANUFACTURER = '';
    }
    if (!this.newPipeLine.LINE_COMMENT) {
      this.newPipeLine.LINE_COMMENT = '';
    }
    this.isAddLine = true;
    // console.log(this.newPipeLine);
    this.referencedata.newPipeLine(this.newPipeLine).subscribe(
      response => {
        let success = true;
        if (response === 0) {
          success = false;
        }

        if (success) {
          this.modalAddPipeLine.hide();
          this.toastr.success('Create pipe line', 'successfully');
          this.router.navigate(['/references/pipeline']);
          this.refrestListLineElmt();
          this.newPipeLine = new PipeLineElmt();
          this.ngOnInit();
        } else {
          swal('Oops..', 'Create pipeline error!', 'error');
        }
        this.isAddLine = false;
      },
      err => {
        this.isAddLine = false;
        console.log(err);
      },
      () => {
        this.isAddLine = false;
      }
    );
  }

  deletePipeLine(pipeLineElmt) {
    this.isDeletePipeLine = true;
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
        this.referencedata.deletePipeLine(pipeLineElmt.ID_PIPELINE_ELMT)
        .subscribe(
        data => {
          console.log(data);
          if (data === 1) {
            this.toastr.success('Delete pipe line', 'successfully');
          } else {
            swal('Oops..', 'Delete pipe line error!', 'error');
          }
          this.isDeletePipeLine = false;
        },
        err => {
          console.log(err);
          this.isDeletePipeLine = false;
        },
        () => {
          this.refrestListLineElmt();
          this.isDeletePipeLine = false;
          this.selectLine = new PipeLineElmt();
        }
        );
      }
    });
  }

  updatePipeLineElmt(pipeLine) {
    // console.log(pipeLine);
    if (!pipeLine.LABEL || pipeLine.LABEL === undefined) {
      swal('Oops..', 'Please specify name!', 'warning');
      return;
    }
    if (typeof pipeLine.LABEL === 'number') {
      swal('Oops..', 'Not a valid string in Name !', 'warning');
      return;
    }
    if (!pipeLine.LINE_VERSION) {
      swal('Oops..', 'Please specify version!', 'warning');
      return;
    }
    if (isNaN(pipeLine.LINE_VERSION)) {
      swal('Oops..', 'Not a valid number in Version !', 'warning');
      return;
    }
    if (!pipeLine.ELMT_PRICE || pipeLine.ELMT_PRICE === undefined) {
      swal('Oops..', 'Not a valid number in Price !', 'warning');
      return;
    }
    if (isNaN(pipeLine.ELMT_PRICE)) {
      swal('Oops..', 'Not a valid number in Price !', 'warning');
      return;
    }
    if (!pipeLine.ELT_SIZE || pipeLine.ELT_SIZE === undefined) {
      swal('Oops..', 'Not a valid number in Size !', 'warning');
      return;
    }
    if (isNaN(pipeLine.ELT_SIZE)) {
      swal('Oops..', 'Not a valid number in Size !', 'warning');
      return;
    }
    if (!pipeLine.LINE_RELEASE) {
      swal('Oops..', 'Please choose status !', 'warning');
      return;
    }
    if (pipeLine.ELT_LOSSES_1 === undefined || !pipeLine.ELT_LOSSES_1) {
      this.newPipeLine.ELT_LOSSES_1 = 0;
    }
    if (pipeLine.ELT_LOSSES_2 === undefined || !pipeLine.ELT_LOSSES_2) {
      this.newPipeLine.ELT_LOSSES_2 = 0;
    }
    if (pipeLine.MANUFACTURER === undefined || !pipeLine.MANUFACTURER) {
      pipeLine.MANUFACTURER = '';
    }
    if (!pipeLine.LINE_COMMENT) {
      pipeLine.LINE_COMMENT = '';
    }
    this.isUpdatePipeLine = true;
    this.referencedata.updatePipeLine({
      id: this.selectLine.ID_PIPELINE_ELMT,
      body: pipeLine
    }).subscribe(
      response => {
        let success = true;
        if (response === 0) {
          success = false;
        }

        if (success) {
          this.modalAddPipeLine.hide();
          this.toastr.success('Update pipe line', 'successfully');
          this.router.navigate(['/references/pipeline']);
          this.refrestListLineElmt();
          this.updatePipeLine = new PipeLineElmt();
        } else {
          swal('Oops..', 'Update pipeline error!', 'error');
        }
        this.isUpdatePipeLine = false;
      },
      err => {
        this.isUpdatePipeLine = false;
        console.log(err);
      },
      () => {
        this.isUpdatePipeLine = false;
        this.selectLine = new PipeLineElmt();
      }
    );
  }

  saveAsPipeLine(oldPipeLine) {
    this.isSaveAs = true;
    this.referencedata.saveAsPipeLine({
      id: oldPipeLine.ID_PIPELINE_ELMT,
      name: this.pipeLineSaveAs.newName
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
          this.router.navigate(['/references/pipeline']);
          this.refrestListLineElmt();
          this.updatePipeLine = new PipeLineElmt();
          this.pipeLineSaveAs = {
            newName: ''
          };
        } else {
          swal('Oops..', 'Save as pipe line error!', 'error');
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
