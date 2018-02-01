import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Study } from '../../../api/models/study';
import { ApiService } from '../../../api/services';
import { InputNavItems } from '../input.nav-items';
import { Production } from '../../../api/models/production';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.scss']
})
export class ObjectivesComponent implements OnInit, AfterViewInit {

  public study: Study;
  public production: Production;

  public laddaSavingObjectives = false;
  public isLoading = false;

  constructor(private api: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.isLoading = true;
  }

  saveObjectiveView() {
    this.laddaSavingObjectives = true;
    this.api.saveStudy({
      id: this.study.ID_STUDY,
      body: this.study
    }).subscribe(
      resp => {
        localStorage.setItem('study', JSON.stringify(this.study));
        console.log(resp);
        this.api.saveProduction({
          id: this.production.ID_PRODUCTION,
          body: this.production
        }).subscribe(
          data => {
            console.log(data);
            this.toastr.success('Save objectives completed!', 'Success');
            this.laddaSavingObjectives = false;
          },
          error2 => {
            console.log(error2);
            this.laddaSavingObjectives = false;
          },
          () => {
            this.laddaSavingObjectives = false;
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  toggleChainControl() {
    if (this.study.CHAINING_CONTROLS) {
      this.study.OPTION_CRYOPIPELINE = false;
    } else {
      this.study.CHAINING_ADD_COMP_ENABLE = false;
    }
  }

  ngAfterViewInit() {
    this.isLoading = true;
    this.api.getStudyById( JSON.parse(localStorage.getItem('study')).ID_STUDY ).subscribe(
      (resp: Study) => {
        this.study = resp;
        console.log(this.study);
        this.api.getProductionById(this.study.ID_PRODUCTION).subscribe(
          data => {
            // console.log('get studies response:');
            // console.log(data);
            this.production = data;
          },
          err => {
            console.log(err);
          },
          () => {
            // console.log('find sttudies completed');
            this.isLoading = false;
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

}
