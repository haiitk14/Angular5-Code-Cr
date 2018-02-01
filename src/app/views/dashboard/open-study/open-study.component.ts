import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { map } from 'rxjs/operators/map';
import { ApiService } from '../../../api/services';
import { error } from 'selenium-webdriver';
import { Study, ViewOpenStudy } from '../../../api/models';
import { IOption } from 'ng-select';
import { Router } from '@angular/router';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';

import * as Models from '../../../api/models';

import swal from 'sweetalert2';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  public transform(values: Study[], filter: string): any[] {
    if (!values || !values.length) {
      return [];
    }
    if (!filter) {
      return values;
    }

    return values.filter(v => v.STUDY_NAME.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
  }
}

@Component({
  selector: 'app-open-study',
  templateUrl: './open-study.component.html',
  styleUrls: ['./open-study.component.scss']
})
export class OpenStudyComponent implements OnInit, AfterViewInit {
  @ViewChild('modalSaveAs') public modalSaveAs: ModalDirective;
  public studies: ViewOpenStudy;

  public selectedStudy: Study = null;
  public studyID: any;

  public filterUsers: Array<IOption> = [];
  public filterCompFamilies: Array<IOption> = [];
  public filterCompSubFamilies: Array<IOption> = [];
  public filterComponents: Array<IOption> = [];

  public filterString = '';
  public name = '';
  public laddaOpeningStudy = false;
  public laddaDeletingStudy = false;

  constructor(private api: ApiService, private router: Router) {}
  ngOnInit() {
  }

  openStudy() {
    localStorage.setItem('study', JSON.stringify(this.selectedStudy));
    this.laddaOpeningStudy = true;
    this.api.openStudy(this.selectedStudy.ID_STUDY)
      .subscribe(
        data => {
          this.router.navigate(['/input']);
        },
        err => {

        },
        () => {
          this.laddaOpeningStudy = false;
        }
      );
  }

  onSelect(study: Study) {
    console.log('select study: ' + study.ID_STUDY);
    this.selectedStudy = study;
  }

  refrestListStudies() {
    localStorage.removeItem('study');
    this.selectedStudy = null;
    this.api.findStudies()
      .subscribe(
      data => {
        // console.log('get studies response:');
        // console.log(data);
        this.studies = data;
      },
      err => {
        console.log(err);
      },
      () => {
        // console.log('find sttudies completed');
      }
      );
  }

  ngAfterViewInit() {
    console.log('open study initializing');
    this.refrestListStudies();
  }

  deleteStudy() {
    this.laddaDeletingStudy = true;
    this.api.deleteStudyById(this.selectedStudy.ID_STUDY).subscribe(
      data => {
        console.log(data);
        this.laddaDeletingStudy = false;
        this.refrestListStudies();
      },
      err => {
        this.laddaDeletingStudy = false;
        console.log(err);
      },
      () => {
        this.laddaDeletingStudy = false;
      }
    );
  }

  chainStudy() {
    swal('Warning', 'This feature is under development!', 'warning');

  }

  saveStudyAs() {
    console.log(this.name);
    if (!this.name) {
      swal('Error', 'Please specify study name!', 'error');
      return false;
    }
    this.studyID = this.selectedStudy.ID_STUDY;
    const studyName = this.name;
        // console.log(studyName);
        console.log(this.name);
    this.api.saveStudyAs({
      id: this.studyID,
      name: this.name
    }).subscribe(
      (data: Study) => {
        this.modalSaveAs.hide();
        this.refrestListStudies();
      },
      (err) => {
        swal('Error', err.error.message, 'error');
        console.log(err);
      },
      () => {
      }
    );
    // swal('Warning', 'This feature is under developmente!', 'warning');
  }

}
