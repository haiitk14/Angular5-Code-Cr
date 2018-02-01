import { Component, OnInit } from '@angular/core';
import { Study } from '../../../api/models';
import { ApiService } from '../../../api/services';
import { Nl2BrPipe } from 'nl2br-pipe';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-study',
  templateUrl: './new-study.component.html',
  styleUrls: ['./new-study.component.scss']
})
export class NewStudyComponent implements OnInit {
  public study: Study;
  public laddaSavingStudy = false;

  constructor(private api: ApiService, private router: Router) {
    this.study = new Study();
    this.study.CALCULATION_MODE = 3;
  }

  ngOnInit() {
  }

  toggleChainControl() {
    if (this.study.CHAINING_CONTROLS) {
      this.study.OPTION_CRYOPIPELINE = false;
    } else {
      this.study.CHAINING_ADD_COMP_ENABLE = false;
    }
  }

  saveStudy() {
    if (!this.study.STUDY_NAME) {
      swal('Error', 'Please specify study name!', 'error');
      return false;
    }

    this.api.createStudy(this.study).subscribe(
      (resp: Study) => {
        localStorage.setItem('study', JSON.stringify(resp));
        this.api.openStudy(resp.ID_STUDY)
          .subscribe(
          data => {
            this.router.navigate(['/input']);
          },
          err => {

          },
          () => {

          }
          );
      },
      (err) => {
        this.laddaSavingStudy = false;
      },
      () => {
        this.laddaSavingStudy = false;
      }
    );
  }
}
