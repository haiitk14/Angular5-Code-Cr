import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OnChanges } from '@angular/core';

import { ViewChild } from '@angular/core';
import { CalculatorComponent } from '../../calculation/calculator/calculator.component';
import { User } from '../../../api/models/user';
import { ApiService } from '../../../api/services';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import 'chart.piecelabel.js';
import { TranslateService } from '@ngx-translate/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { CheckControl } from '../../../api/models/check-control';

@Component({
  selector: 'app-preliminary',
  templateUrl: './preliminary.component.html',
  styleUrls: ['./preliminary.component.scss']
})
export class PreliminaryComponent implements OnInit, AfterViewInit {
  @ViewChild('consumptionPieModal') public consumptionPieModal: ModalDirective;
  @ViewChild('modalSaveAs') public modalSaveAs: ModalDirective;

  public study;
  public user;
  public ecoEnable;
  public symbol;
  public resultAna;
  public headBalanceResults;
  public headBalanceMaxResults;
  public commonResults;
  public economicResults;
  public headBalanceResultsTr;
  public headBalanceResultsTr01;
  public headBalanceResultsTr02;
  public checkcontrol: CheckControl;

  public chartPieData = {
    name: '',
    percentProduct: 0,
    percentEquipmentPerm: 0,
    percentEquipmentDown: 0,
    percentLine: 0
  };
  public activePage = '';
  public displayPie: boolean;
  public pieOptions;
  public pieLabels;
  public pieData;
  public pieChartType = 'pie';

  public pieColours: Array<any> = [
    { backgroundColor: ['#0000FF', '#00BFBF', '#00FFFF', '#33CC33'], }
  ];

  public pieOptionsNone;
  public pieLabelsNone;
  public pieDataNone;
  public pieChartTypeNone = 'pie';

  public pieColoursNone: Array<any> = [
    { backgroundColor: ['#b4b9c1', '#b4b9c1', '#b4b9c1'], }
  ];

  @ViewChild('calculator') calculator: CalculatorComponent;
  @ViewChild(BaseChartDirective) myChart: BaseChartDirective;

  constructor(private api: ApiService, private translate: TranslateService) { }

  ngOnInit() {
    if (localStorage.getItem('study')) {
      this.study = JSON.parse(localStorage.getItem('study'));
      this.displayPie = true;
    }
  }
  openPageHeat() {
    const page = <HTMLElement>document.getElementById('pageHeat');
    const pageCon = <HTMLElement>document.getElementById('pageConsumption');
    const pageEco = <HTMLElement>document.getElementById('pageEconomics');
    page.style.display = 'block';
    pageCon.style.display = 'none';
    pageEco.style.display = 'none';
    this.activePage = 'heat';
  }
  openPageCon() {
    const page = <HTMLElement>document.getElementById('pageHeat');
    const pageCon = <HTMLElement>document.getElementById('pageConsumption');
    const pageEco = <HTMLElement>document.getElementById('pageEconomics');
    page.style.display = 'none';
    pageEco.style.display = 'none';
    pageCon.style.display = 'block';
    this.activePage = 'consumpt';
  }
  openPageEco() {
    const page = <HTMLElement>document.getElementById('pageHeat');
    const pageCon = <HTMLElement>document.getElementById('pageConsumption');
    const pageEco = <HTMLElement>document.getElementById('pageEconomics');
    page.style.display = 'none';
    pageEco.style.display = 'block';
    pageCon.style.display = 'none';
    this.activePage = 'economic';
  }
  openHeadBalacePage() {
    const showLoaderChange = <HTMLElement>document.getElementById('showLoaderChange');
    showLoaderChange.style.display = 'block';
    const headBalancePage = <HTMLElement>document.getElementById('headBalacePage');
    const headBalanceMaxPage = <HTMLElement>document.getElementById('headBalaceMaxPage');
    this.api.getOptimumHeadBalance(this.study.ID_STUDY).subscribe(
      data => {
        this.headBalanceResults = data;
        headBalancePage.style.display = 'block';
        headBalanceMaxPage.style.display = 'none';
        showLoaderChange.style.display = 'none';
      }
    );
  }
  openHeadBalaceMaxPage() {
    const showLoaderChange = <HTMLElement>document.getElementById('showLoaderChange');
    showLoaderChange.style.display = 'block';
    const headBalancePage = <HTMLElement>document.getElementById('headBalacePage');
    const headBalanceMaxPage = <HTMLElement>document.getElementById('headBalaceMaxPage');
    this.api.getOptimumHeadBalanceMax(this.study.ID_STUDY).subscribe(
      data => {
        this.headBalanceMaxResults = data;
        headBalancePage.style.display = 'none';
        headBalanceMaxPage.style.display = 'block';
        showLoaderChange.style.display = 'none';
      }
    );
  }
  openTrPage(value) {
    const showLoaderChange = <HTMLElement>document.getElementById('showLoaderChange');
    showLoaderChange.style.display = 'block';
    const params: ApiService.GetEstimationHeadBalanceParams = {
      idStudy: this.study.ID_STUDY,
      tr: value
    };
    this.api.getEstimationHeadBalance(params).subscribe(
      data => {
        this.headBalanceResultsTr = data;
        showLoaderChange.style.display = 'none';
      }
    );
  }
  ngAfterViewInit() {
    this.study = JSON.parse(localStorage.getItem('study'));
    this.refeshView();
    const params: ApiService.CheckControlViewParams = {
      idStudy: this.study.ID_STUDY,
      idProd: this.study.ID_PROD
    };

    this.api.checkControl(params).subscribe(
      data => {
        this.checkcontrol = data;
        console.log(this.checkcontrol);
      }
    );
  }
  onConsumptionPie(element) {
    this.chartPieData.name = element.equipName;
    this.chartPieData.percentProduct = element.percentProduct;
    this.chartPieData.percentEquipmentPerm = element.percentEquipmentPerm;
    this.chartPieData.percentEquipmentDown = element.percentEquipmentDown;
    this.chartPieData.percentLine = element.percentLine;

    this.pieOptions = {
      responsive: true,
      pieceLabel: {
          render: 'value',
          fontSize: 14,
          fontStyle: 600,
          fontColor: ['#fff', '#000', '#000', '#fff'],
          fontFamily: '"Helvetica Neue", "Helvetica", "Arial", sans-serif',
          overlap: true
      },
      tooltips: {
        enabled: false
      },
      legend: {
        onClick: (e) => e.stopPropagation()
      }
    };
    this.pieLabels = [];
    this.pieLabels = [this.translate.instant('Product') + ': ' + element.percentProduct + '%',
    this.translate.instant('Equipment(permanent)') + ': ' + element.percentEquipmentPerm + '%',
    this.translate.instant('Equipment(cool down)') + ': ' + element.percentEquipmentDown + '%'];

    if (element.percentLine > 0) {
      this.pieLabels.push(this.translate.instant('Line') + ': ' + element.percentLine + '%');
    }
    this.displayPie = true;
    if ((element.percentProduct + element.percentEquipmentPerm + element.percentEquipmentDown + element.percentLine) === 0) {
      this.displayPie = false;
    }
    const dataChart = [element.percentProduct, element.percentEquipmentPerm, element.percentEquipmentDown, element.percentLine];
    this.pieData = [
      {
        data: [element.percentProduct, element.percentEquipmentPerm, element.percentEquipmentDown, element.percentLine]
      }
    ];
    if (this.myChart) {
      this.myChart.chart.config.data.labels = this.pieLabels;
      this.myChart.chart.update();
    }

    // pie none
    this.pieDataNone = [{
      data: [100, 0, 0]
    }];
    console.log(this.pieDataNone);
    this.pieOptionsNone = {
      responsive: true,
      tooltips: {
        enabled: false
      },
      legend: {
        onClick: (e) => e.stopPropagation()
      }
    };
    this.pieLabelsNone = [];
    this.pieLabelsNone = [this.translate.instant('Product') + ': 0%',
    this.translate.instant('Equipment(permanent)') + ': 0%',
    this.translate.instant('Equipment(cool down)') + ': 0%'];

    this.consumptionPieModal.show();
  }
  closePie() {
    this.consumptionPieModal.hide();
  }
  refeshView() {
    this.api.getSymbol(this.study.ID_STUDY).subscribe(
      data => {
        this.symbol = data;
      }
    );

    this.api.getProInfoStudy(this.study.ID_STUDY).subscribe(
      data => {
        this.resultAna = data;
      }
    );

    this.api.getProductById(this.study.ID_PROD).subscribe(
      data => {
        // console.log(data);
      }
    );

    if (this.study.CALCULATION_MODE == 1) {
      const params: ApiService.GetEstimationHeadBalanceParams = {
        idStudy: this.study.ID_STUDY,
        tr: 1
      };
      this.api.getEstimationHeadBalance(params).subscribe(
        data => {
          this.headBalanceResultsTr = data;
          this.activePage = 'heat';
        }
      );
    } else {
      this.api.getOptimumHeadBalance(this.study.ID_STUDY).subscribe(
        data => {
          console.log(data);
          this.headBalanceResults = data;
          this.activePage = 'heat';
        }
      );
    }

    this.api.getAnalyticalConsumption(this.study.ID_STUDY).subscribe(
      data => {
        this.commonResults = data;
      }
    );

    this.api.getAnalyticalEconomic(this.study.ID_STUDY).subscribe(
      data => {
        this.economicResults = data;
      }
    );
  }

  onFinishCalculate() {
    this.refeshView();
  }
}
