import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../../api/services';
import { CheckControlView } from '../../../api/models/check-control-view';
import { CheckControl } from '../../../api/models/check-control';
import { Study } from '../../../api/models/study';
import { ProductElmt } from '../../../api/models/product-elmt';
import { ViewChild } from '@angular/core';
import { CalculatorComponent } from '../calculator/calculator.component';

@Component({
  selector: 'app-check-control',
  templateUrl: './check-control.component.html',
  styleUrls: ['./check-control.component.scss']
})
export class CheckControlComponent implements OnInit, AfterViewInit {
  @ViewChild('calculator') calculator: CalculatorComponent;
  public checkcontrolview: CheckControlView;
  public checkcontrol: CheckControl;
  public study: Study;
  public isLoading = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.isLoading = true;
  }

  ngAfterViewInit() {
    this.isLoading = true;
    this.study = JSON.parse(localStorage.getItem('study'));
    const params: ApiService.CheckControlViewParams = {
      idStudy: this.study.ID_STUDY,
      idProd: this.study.ID_PROD
    };

    this.api.checkControlView(params).subscribe(
      data => {
        this.checkcontrolview = data;
        console.log(data);
        this.isLoading = false;
      }
    );

    this.api.checkControl(params).subscribe(
      data => {
        this.checkcontrol = data;
        console.log(this.checkcontrol);
        this.isLoading = false;

        if (this.checkcontrol.checkcontrol) {
          this.calculator.open();
        }
      }
    );
  }
}
