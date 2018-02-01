import { Component, OnInit, AfterContentChecked, AfterViewInit } from '@angular/core';
import { Study, ViewProduct, PipeLineElmt} from '../../../api/models';
import { ApiService } from '../../../api/services';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit, AfterContentChecked, AfterViewInit {
  public study: Study;
  public productShape: number;
  public productView: ViewProduct;
  public lineEmlt: PipeLineElmt;
  public laddaSavingLine = false;
  public dataResultExist;
  public dataResult;
  public diameterSelected: number;
  constructor(private api: ApiService, private router: Router) { }
  ngOnInit() {
    this.diameterSelected = 0;
  }

  ngAfterContentChecked() {
    this.study = JSON.parse(localStorage.getItem('study'));
    if (!this.study.OPTION_CRYOPIPELINE) {
      swal('Oops..', 'This study does not have enabled CryoPipeline calculation option', 'error');
      this.router.navigate(['/input/objectives']);
    }

    this.productShape = Number(localStorage.getItem('productShape'));
    this.productView = JSON.parse(localStorage.getItem('productView'));
    if (this.productShape == 0 || !this.productView.elements || this.productView.elements.length == 0) {
      swal('Oops..', 'Please define product along with elements first', 'error');
      this.router.navigate(['/input/product']);
    }
  }
  ngAfterViewInit(){
    this.refeshView();
  }
  refeshView() {
    this.api.loadPipeline(this.study.ID_STUDY).subscribe(
      data => {
        console.log(data);
      }
    );
  }
  saveLine() {
    this.laddaSavingLine = true;
    // const studyID = this.study.ID_STUDY;
    // console.log(this.study.ID_STUDY);
    // this.api.loadPipeline({}).subscribe(
    //   (data: PipeLineElmt) => {
    //   },
    //   (err) => {
    //     // swal('Error', err.error.message, 'error');
    //     // console.log(err);
    //   },
    //   () => {
    //   }
    // );
    swal('Warning', 'This feature is under developmente!', 'warning');
  }
}
