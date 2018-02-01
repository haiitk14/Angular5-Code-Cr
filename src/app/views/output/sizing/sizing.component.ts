import { Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import { OnChanges } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ViewChild } from '@angular/core';
import { CalculatorComponent } from '../../calculation/calculator/calculator.component';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { ApiService } from '../../../api/services';
import { TranslateService } from '@ngx-translate/core';
import { ViewSizingEstimationResult } from '../../../api/models/view-sizing-estimation-result';
import { ViewSizingResultOptimum } from '../../../api/models/view-sizing-result-optimum';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { CheckControl } from '../../../api/models/check-control';

@Component({
  selector: 'app-sizing',
  templateUrl: './sizing.component.html',
  styleUrls: ['./sizing.component.scss']
})
export class SizingComponent implements OnInit, AfterViewInit {
  @ViewChild('calculator') calculator: CalculatorComponent;
  @ViewChild(BaseChartDirective) myGraphEstimationData;
  @ViewChild(BaseChartDirective) myEstimationAvailableChart;
  @ViewChild(BaseChartDirective) myGraphOptimumData;
  @ViewChild(BaseChartDirective) myGraphOptimumData01;

  public checkcontrol: CheckControl;

  constructor(private api: ApiService, private translate: TranslateService) { }

  public study;
  public symbol;
  public sizingOptimumValue;
  public sizingEstimationValue;
  public selectedEquipment;
  public availableEquipment;
  public customFlowRate;

  public graphType = 'bar';
  public graphLegend = true;
  public studyEquipments;
  public temperatureProfileData;

  public tempChartData;
  public tempChartOptions;
  public tempChartLegend = true;
  public tempChartType= 'line';
  public tempColours: Array<any> = [
    { backgroundColor: ['rgb(0,0,255)', 'rgb(0,192,192)', 'rgb(0,255,255)', 'rgb(0,255,0)', 'rgb(255,0,0)', 'rgb(255,0,255)'], }
  ];

  public convChartData;
  public convChartOptions;
  public convChartLegend = true;
  public convChartType = 'line';
  public trGraph: number;
  public selectedEquip: number;
  public selectedEquipList = [];
  public selectedActiveEquip = [];

  public minGraphChart;
  public maxGraphChart;

  public grapColours: Array<any> = [
    { backgroundColor: ['rgb(255,0,0)', 'rgb(0, 0, 255)', 'rgb(153, 204, 255)', 'rgb(51, 204, 51)', 'rgb(102, 255, 153)'], }
  ];

  public graphData;
  public graphOptions: any = {};
  public graphLabels;

  public dataGraphChart;
  public equipmentList = [];
  public activeEquipment = [];
  public graphEstimationData;
  public graphEstimationLabels = ['dump', 'TR-10°C', 'TR', 'TR+10°C', 'dump'];
  public graphEstimationOptions: any = {};
  public graphEstimationOptions01: any = {};

  public estimationAvailableChart;
  public estimationAvailableLabels;
  public estimationAvailableOptions: any = {};

  public activePage = '';

  ngOnInit() {
    if (localStorage.getItem('study')) {
      this.study = JSON.parse(localStorage.getItem('study'));
    }
    this.selectedEquip = 0;
    this.trGraph = 1;
  }

  ngAfterViewInit() {
    const showLoaderChange = <HTMLElement>document.getElementById('showLoaderChange');
    showLoaderChange.style.display = 'block';
    if (localStorage.getItem('study')) {
      this.study = JSON.parse(localStorage.getItem('study'));
      this.api.getSymbol(this.study.ID_STUDY).subscribe(
        data => {
          this.activePage = 'result';
          this.symbol = data;
          showLoaderChange.style.display = 'none';
          this.graphEstimationOptions = {
            scaleShowVerticalLines: false,
            responsive: false,
            legend: {
              onClick: (e) => e.stopPropagation(),
              position: 'bottom',
              labels: {
                padding: 10
              }
            },
            title:
            {
              display: false,
              text: 'Graph Chart',
              fontColor: '#000',
              fontSize: 20
            },
            tooltips: {
              mode: 'index',
              intersect: true
            },
            scales: {
              xAxes: [{
                ticks: {
                  min: 'TR-10°C',
                  max: 'TR+10°C'
                }
              }],
              yAxes: [{
                  type: 'linear',
                  display: true,
                  position: 'left',
                  id: 'y-axis-1',
                  scaleLabel: {
                    display: true,
                    labelString: this.translate.instant('Flow rate') + ' ' + this.symbol.productFlowSymbol,
                    fontColor: '#f00',
                    fontSize: 20
                  },
                  ticks: {
                    min: 0
                  }
              }, {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  id: 'y-axis-2',
                  gridLines: {
                    drawOnChartArea: false
                  },
                  scaleLabel: {
                    display: true,
                    labelString: this.translate.instant('Conso')
                    + ' ' + this.symbol.consumSymbol + '/' + this.symbol.perUnitOfMassSymbol,
                    fontColor: '#f00',
                    fontSize: 20
                  },
                  ticks: {
                    min: 0
                  }
              }],
            }
          };
          if (this.study.CALCULATION_MODE == 1) {
            const params: ApiService.SizingEstimationResultParams = {
              idStudy: this.study.ID_STUDY
            };
            this.api.sizingEstimationResult(params).subscribe(
              (dataCh: ViewSizingEstimationResult) => {
                this.sizingEstimationValue = dataCh.result;
                this.dataGraphChart = dataCh.dataGraphChart;
                this.selectedEquip = this.dataGraphChart[0].id;
                for (let i = 0; i < Object.keys(dataCh.dataGraphChart).length; i++) {
                  this.equipmentList.push(dataCh.dataGraphChart[i]);
                }
                // this.graphEstimationData = chartEstimationData;

                this.loadEquipmentEstimationChart();
              }
            );
          } else {
            this.api.sizingOptimumResult(this.study.ID_STUDY).subscribe(
              (dataCh: ViewSizingResultOptimum) => {
                this.sizingOptimumValue = dataCh.result;
                this.selectedEquipment = dataCh.selectedEquipment;
                this.availableEquipment = dataCh.availableEquipment;
                this.equipmentList = this.availableEquipment;
                this.activeEquipment = this.selectedEquipment;
                this.loadOptimumAvailableChart();
              }
            );
          }
        }
      );
    }

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
  moveSelectedEquipment() {
    for (let i = 0; i < Object.keys(this.selectedEquipList).length; i++) {
      this.activeEquipment.push(this.selectedEquipList[i]);
      const index = this.equipmentList.indexOf(this.selectedEquipList[i]);
      this.equipmentList.splice(index, 1);
    }
    this.selectedEquipList = [];
  }
  moveAvailableEquipment() {
    for (let i = 0; i < Object.keys(this.selectedActiveEquip).length; i++) {
      this.equipmentList.push(this.selectedActiveEquip[i]);
      const index = this.activeEquipment.indexOf(this.selectedActiveEquip[i]);
      this.activeEquipment.splice(index, 1);
    }
    console.log(this.equipmentList);
    this.selectedActiveEquip = [];
  }
  loadEstimationAvailableChart() {
    const showLoaderChange = <HTMLElement>document.getElementById('showLoaderChange');
    showLoaderChange.style.display = 'block';
    const dataGraphChart = this.activeEquipment;
    const dataGrapChartLength = Object.keys(dataGraphChart).length;
    if (dataGrapChartLength > 0) {
      const labelGrap = [];
      const dataCustomFlowRate = [];
      const dataDhp = [];
      const dataDhpMax = [];
      const dataConso = [];
      const dataConsoMax = [];
      /*labelGrap.push('dump');
      dataCustomFlowRate.push(dataGraphChart[0].dhp);
      dataDhp.push(0);
      dataDhpMax.push(0);
      dataConso.push(0);
      dataConsoMax.push(0);*/
      this.minGraphChart = dataGraphChart[0].equipName;
      this.maxGraphChart = dataGraphChart[Object.keys(dataGraphChart).length - 1].equipName;
      for (let j = 0; j < Object.keys(dataGraphChart).length; j++) {
        labelGrap.push( dataGraphChart[j].equipName);
        const objDataGraph = dataGraphChart[j].data;
        for (let i = 0; i < Object.keys(objDataGraph).length; i++) {
          if (i == this.trGraph) {
            dataCustomFlowRate.push(objDataGraph[i].dhp);
            dataDhp.push(objDataGraph[i].dhp);
            dataDhpMax.push(objDataGraph[i].dhpMax);
            dataConso.push(objDataGraph[i].conso);
            dataConsoMax.push(objDataGraph[i].consoMax);
          }
        }
        const chartEstimationData = [
          {data: JSON.parse(JSON.stringify(dataCustomFlowRate)), label: this.translate.instant('Custom flow rate'),
          type: 'line', radius: 0, fill: false, borderColor: '#f00', borderWidth: 2},
          {data: JSON.parse(JSON.stringify(dataDhp)), label: this.translate.instant('Product flowrate'),
                  backgroundColor: 'rgb(0, 0, 255)'},
          {data: JSON.parse(JSON.stringify(dataDhpMax)), label: this.translate.instant('Maximum product flowrate'),
                  backgroundColor: 'rgb(153, 204, 255)'},
          {data: JSON.parse(JSON.stringify(dataConso)),
                  label: this.translate.instant('Cryogen consumption (product + equipment heat losses)'),
                  backgroundColor: 'rgb(51, 204, 51)', yAxisID: 'y-axis-2'},
          {data: JSON.parse(JSON.stringify(dataConsoMax)),
                  label: this.translate.instant('Maximum cryogen consumption (product + equipment heat losses)'),
                  backgroundColor: 'rgb(102, 255, 153)', yAxisID: 'y-axis-2'}
        ];
        this.estimationAvailableChart = chartEstimationData;
      }
      /*labelGrap.push('dump');
      dataCustomFlowRate.push(dataGraphChart[0].dhp);
      dataDhp.push(0);
      dataDhpMax.push(0);
      dataConso.push(0);
      dataConsoMax.push(0);*/
      this.estimationAvailableLabels = labelGrap;
      this.graphEstimationOptions01 = {
        scaleShowVerticalLines: false,
        responsive: false,
        legend: {
          onClick: (e) => e.stopPropagation(),
          position: 'bottom',
          labels: {
            padding: 10
          }
        },
        title:
        {
          display: false,
          text: 'Graph Chart',
          fontColor: '#000',
          fontSize: 20
        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        scales: {
          /*xAxes: [{
            ticks: {
              min: this.minGraphChart,
              max: this.maxGraphChart
            }
          }],*/
          yAxes: [{
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y-axis-1',
              scaleLabel: {
                display: true,
                labelString: this.translate.instant('Flow rate') + ' ' + this.symbol.productFlowSymbol,
                fontColor: '#f00',
                fontSize: 20
              },
              ticks: {
                min: 0
              }
          }, {
              type: 'linear',
              display: true,
              position: 'right',
              id: 'y-axis-2',
              gridLines: {
                drawOnChartArea: false
              },
              scaleLabel: {
                display: true,
                labelString: this.translate.instant('Conso')
                + ' ' + this.symbol.consumSymbol + '/' + this.symbol.perUnitOfMassSymbol,
                fontColor: '#f00',
                fontSize: 20
              },
              ticks: {
                min: 0
              }
          }],
        }
      };
      if (this.myEstimationAvailableChart) {
        this.myEstimationAvailableChart.chart.config.data.labels = this.estimationAvailableLabels;
      }
    } else {
      this.estimationAvailableChart = '';
    }
    showLoaderChange.style.display = 'none';
  }
  loadOptimumAvailableChart() {
    const chartGraphOptimumData = <HTMLElement>document.getElementById('chartGraphOptimumData');
    const showLoaderChange = <HTMLElement>document.getElementById('showLoaderChange');
    showLoaderChange.style.display = 'block';
    const dataGraphChart = this.activeEquipment;
    const dataGrapChartLength = Object.keys(dataGraphChart).length;
    const labelGrap = [];
    const dataCustomFlowRate = [];
    const dataDhp = [];
    const dataDhpMax = [];
    const dataConso = [];
    const dataConsoMax = [];
    if (dataGrapChartLength > 0) {
      /*labelGrap.push('dump');
      dataCustomFlowRate.push(dataGraphChart[0].dhp);
      dataDhp.push(0);
      dataDhpMax.push(0);
      dataConso.push(0);
      dataConsoMax.push(0);*/
      this.minGraphChart = dataGraphChart[0].equipName;
      this.maxGraphChart = dataGraphChart[Object.keys(dataGraphChart).length - 1].equipName;
      console.log(this.minGraphChart);
      console.log(this.maxGraphChart);
      console.log(dataCustomFlowRate);
      for (let i = 0; i < Object.keys(dataGraphChart).length; i++) {
        labelGrap.push(dataGraphChart[i].equipName);
        dataCustomFlowRate.push(dataGraphChart[i].dhp);
        dataDhp.push(dataGraphChart[i].dhp);
        dataDhpMax.push(dataGraphChart[i].dhpMax);
        dataConso.push(dataGraphChart[i].conso);
        dataConsoMax.push(dataGraphChart[i].consoMax);
      }
      /* labelGrap.push('dump');
      dataCustomFlowRate.push(dataGraphChart[0].dhp);
      dataDhp.push(0);
      dataDhpMax.push(0);
      dataConso.push(0);
      dataConsoMax.push(0); */
      this.graphLabels = labelGrap;
      const chartData = [
        {data: JSON.parse(JSON.stringify(dataCustomFlowRate)), label: this.translate.instant('Custom flow rate'),
        type: 'line', radius: 0, fill: false, borderColor: '#f00', borderWidth: 2},
        {data: JSON.parse(JSON.stringify(dataDhp)), label: this.translate.instant('Product flowrate'),
                backgroundColor: 'rgb(0, 0, 255)'},
        {data: JSON.parse(JSON.stringify(dataDhpMax)), label: this.translate.instant('Maximum product flowrate'),
                backgroundColor: 'rgb(153, 204, 255)'},
        {data: JSON.parse(JSON.stringify(dataConso)),
                label: this.translate.instant('Cryogen consumption (product + equipment heat losses)'),
                backgroundColor: 'rgb(51, 204, 51)', yAxisID: 'y-axis-2'},
        {data: JSON.parse(JSON.stringify(dataConsoMax)),
                label: this.translate.instant('Maximum cryogen consumption (product + equipment heat losses)'),
                backgroundColor: 'rgb(102, 255, 153)', yAxisID: 'y-axis-2'}
      ];
      this.graphData = chartData;
      this.graphOptions = {
        scaleShowVerticalLines: false,
        responsive: false,
        legend: {
          onClick: (e) => e.stopPropagation(),
          position: 'bottom',
          labels: {
            padding: 20
          }
        },
        title:
        {
          display: false,
          text: 'Graph Chart',
          fontColor: '#000',
          fontSize: 20
        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        scales: {
          /*xAxes: [{
            ticks: {
              min: this.minGraphChart,
              max: this.maxGraphChart
            }
          }],*/
          yAxes: [{
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y-axis-1',
              scaleLabel: {
                display: true,
                labelString: this.translate.instant('Flow rate') + ' ' + this.symbol.productFlowSymbol,
                fontColor: '#f00',
                fontSize: 20
              },
              ticks: {
                min: 0
              }
          }, {
              type: 'linear',
              display: true,
              position: 'right',
              id: 'y-axis-2',
              gridLines: {
                  drawOnChartArea: false
              },
              scaleLabel: {
                  display: true,
                  labelString: this.translate.instant('Conso')
                  + ' ' + this.symbol.consumSymbol + '/' + this.symbol.perUnitOfMassSymbol,
                  fontColor: '#f00',
                  fontSize: 20
              },
              ticks: {
                min: 0
              }
          }],
        }
      };
      if (this.myGraphOptimumData) {
        // this.myGraphOptimumData.chart.config.data.datasets = this.graphData;
        this.myGraphOptimumData.chart.config.data.labels = this.graphLabels;
        // this.myGraphOptimumData.chart.update();
      }
    } else {
      this.graphData = '';
    }
    showLoaderChange.style.display = 'none';
  }
  changeEstimationTrGraph(value) {
    this.trGraph = value;
    const showLoaderChange = <HTMLElement>document.getElementById('showLoaderChange');
    showLoaderChange.style.display = 'block';
    const dataGraphChart = this.activeEquipment;
    const dataGrapChartLength = Object.keys(dataGraphChart).length;
    if (dataGrapChartLength > 0) {
      const labelGrap = [];
      const dataCustomFlowRate = [];
      const dataDhp = [];
      const dataDhpMax = [];
      const dataConso = [];
      const dataConsoMax = [];
      for (let j = 0; j < Object.keys(dataGraphChart).length; j++) {
        labelGrap.push( dataGraphChart[j].equipName);
        const objDataGraph = dataGraphChart[j].data;
        for (let i = 0; i < Object.keys(objDataGraph).length; i++) {
          if (i == this.trGraph) {
            dataCustomFlowRate.push(objDataGraph[i].dhp);
            dataDhp.push(objDataGraph[i].dhp);
            dataDhpMax.push(objDataGraph[i].dhpMax);
            dataConso.push(objDataGraph[i].conso);
            dataConsoMax.push(objDataGraph[i].consoMax);
          }
        }
        const chartEstimationData = [
          {data: JSON.parse(JSON.stringify(dataCustomFlowRate)), label: this.translate.instant('Custom flow rate'),
          type: 'line', radius: 0, fill: false, borderColor: '#f00', borderWidth: 2},
          {data: JSON.parse(JSON.stringify(dataDhp)), label: this.translate.instant('Product flowrate'),
                  backgroundColor: 'rgb(0, 0, 255)'},
          {data: JSON.parse(JSON.stringify(dataDhpMax)), label: this.translate.instant('Maximum product flowrate'),
                  backgroundColor: 'rgb(153, 204, 255)'},
          {data: JSON.parse(JSON.stringify(dataConso)),
                  label: this.translate.instant('Cryogen consumption (product + equipment heat losses)'),
                  backgroundColor: 'rgb(51, 204, 51)', yAxisID: 'y-axis-2'},
          {data: JSON.parse(JSON.stringify(dataConsoMax)),
                  label: this.translate.instant('Maximum cryogen consumption (product + equipment heat losses)'),
                  backgroundColor: 'rgb(102, 255, 153)', yAxisID: 'y-axis-2'}
        ];
        this.estimationAvailableChart = chartEstimationData;
      }
      this.estimationAvailableLabels = labelGrap;
      if (this.myEstimationAvailableChart) {
        this.myEstimationAvailableChart.chart.config.data.labels = this.estimationAvailableLabels;
      }
    } else {
      this.estimationAvailableChart = '';
    }
    showLoaderChange.style.display = 'none';
  }
  openSize() {
    this.activePage = 'result';
    const size = <HTMLElement>document.getElementById('sizing');
    const tem = <HTMLElement>document.getElementById('temPer');
    size.style.display = 'block';
    tem.style.display = 'none';
  }
  openTem() {
    this.activePage = 'profile';
    const size = <HTMLElement>document.getElementById('sizing');
    const tem = <HTMLElement>document.getElementById('temPer');
    this.api.getSymbol(this.study.ID_STUDY).subscribe(
      dataSymbol => {
        this.symbol = dataSymbol;
        this.api.getStudyEquipments(this.study.ID_STUDY).subscribe(
          data => {
            this.studyEquipments = data;
            // console.log(this.studyEquipments[0]);
            this.api.temperatureProfile(this.studyEquipments[0]['ID_STUDY_EQUIPMENTS']).subscribe(
              dataTempFirst => {
                const tempChartDataObj =  dataTempFirst.tempChartData;
                const convChartDataObj =  dataTempFirst.convChartData;
                const chartTempData = [
                  {data: JSON.parse(JSON.stringify(tempChartDataObj.top)), label: this.translate.instant('Top'),
                  type: 'line', radius: 0, fill: false, borderColor: 'rgb(0,0,255)', backgroundColor: 'rgb(0,0,255)', borderWidth: 2},
                  {data: JSON.parse(JSON.stringify(tempChartDataObj.bottom)), label: this.translate.instant('Bottom'),
                  type: 'line', radius: 0, fill: false, borderColor: 'rgb(0,192,192)', backgroundColor: 'rgb(0,192,192)', borderWidth: 2},
                  {data: JSON.parse(JSON.stringify(tempChartDataObj.left)), label: this.translate.instant('Left'),
                  type: 'line', radius: 0, fill: false, borderColor: 'rgb(0,255,255)', backgroundColor: 'rgb(0,255,255)', borderWidth: 2},
                  {data: JSON.parse(JSON.stringify(tempChartDataObj.right)), label: this.translate.instant('Right'),
                  type: 'line', radius: 0, fill: false, borderColor: 'rgb(0,255,0)', backgroundColor: 'rgb(0,255,0)', borderWidth: 2},
                  {data: JSON.parse(JSON.stringify(tempChartDataObj.front)), label: this.translate.instant('Front'),
                  type: 'line', radius: 0, fill: false, borderColor: 'rgb(255,0,0)', backgroundColor: 'rgb(255,0,0)', borderWidth: 2},
                  {data: JSON.parse(JSON.stringify(tempChartDataObj.rear)), label: this.translate.instant('Rear'),
                  type: 'line', radius: 0, fill: false, borderColor: 'rgb(255,0,255)', backgroundColor: 'rgb(255,0,255)', borderWidth: 2}
                ];
                const chartConvData = [
                  {data: JSON.parse(JSON.stringify(convChartDataObj.top)), label: this.translate.instant('Top'),
                  type: 'line', radius: 0, fill: false, borderColor: 'rgb(0,0,255)', backgroundColor: 'rgb(0,0,255)', borderWidth: 2},
                  {data: JSON.parse(JSON.stringify(convChartDataObj.bottom)), label: this.translate.instant('Bottom'),
                  type: 'line', radius: 0, fill: false, borderColor: 'rgb(0,192,192)', backgroundColor: 'rgb(0,192,192)', borderWidth: 2},
                  {data: JSON.parse(JSON.stringify(convChartDataObj.left)), label: this.translate.instant('Left'),
                  type: 'line', radius: 0, fill: false, borderColor: 'rgb(0,255,255)', backgroundColor: 'rgb(0,255,255)', borderWidth: 2},
                  {data: JSON.parse(JSON.stringify(convChartDataObj.right)), label: this.translate.instant('Right'),
                  type: 'line', radius: 0, fill: false, borderColor: 'rgb(0,255,0)', backgroundColor: 'rgb(0,255,0)', borderWidth: 2},
                  {data: JSON.parse(JSON.stringify(convChartDataObj.front)), label: this.translate.instant('Front'),
                  type: 'line', radius: 0, fill: false, borderColor: 'rgb(255,0,0)', backgroundColor: 'rgb(255,0,0)', borderWidth: 2},
                  {data: JSON.parse(JSON.stringify(convChartDataObj.rear)), label: this.translate.instant('Rear'),
                  type: 'line', radius: 0, fill: false, borderColor: 'rgb(255,0,255)', backgroundColor: 'rgb(255,0,255)', borderWidth: 2}
                ];
                this.tempChartData =  chartTempData;
                this.convChartData =  chartConvData;
                this.tempChartOptions = {
                  animation: false,
                  responsive: false,
                  legend: {
                    onClick: (e) => e.stopPropagation(),
                    position: 'right',
                    labels: {
                      padding: 20
                    }
                  },
                  hoverMode: 'index',
                  stacked: false,
                  title: {
                      display: false,
                      text: 'Chart 1',
                      fontColor: '#000',
                      fontSize: 20
                  },
                  scales: {
                      xAxes: [{
                          type: 'linear',
                          display: true,
                          scaleLabel: {
                              display: true,
                              labelString: this.translate.instant(this.symbol.timePositionSymbol),
                              fontColor: '#f00',
                              fontSize: 20
                          },
                      }],
                      yAxes: [{
                          type: 'linear',
                          display: true,
                          id: 'y-axis-1',
                          scaleLabel: {
                              display: true,
                              labelString: this.translate.instant(this.symbol.temperatureSymbol),
                              fontColor: '#f00',
                              fontSize: 20
                          },
                          ticks: {
                              stepSize : 10
                          }
                      }],
                  }
                };
                this.convChartOptions = {
                  animation: false,
                  responsive: false,
                  legend: {
                    onClick: (e) => e.stopPropagation(),
                    position: 'right',
                    labels: {
                      padding: 20
                    }
                  },
                  hoverMode: 'index',
                  stacked: false,
                  title: {
                    display: false,
                    text: 'Chart 1',
                    fontColor: '#000',
                    fontSize: 20
                  },
                  scales: {
                    xAxes: [{
                        type: 'linear',
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: this.translate.instant(this.symbol.timePositionSymbol),
                            fontColor: '#f00',
                            fontSize: 20
                        },
                    }],
                    yAxes: [{
                      type: 'linear',
                      display: true,
                      id: 'y-axis-1',
                      scaleLabel: {
                          display: true,
                          labelString: this.translate.instant(this.symbol.convectionCoeffSymbol),
                          fontColor: '#f00',
                          fontSize: 20
                      },
                      ticks: {
                          min: dataTempFirst.minScaleConv,
                          max: dataTempFirst.maxScaleConv,
                      }
                    }],
                  }
                };
              }
            );
          }
        );
        size.style.display = 'none';
        tem.style.display = 'block';
      }
    );
  }
  loadTempChart(element) {
    const showLoaderTermChange = <HTMLElement>document.getElementById('showLoaderTermChange');
    showLoaderTermChange.style.display = 'block';
    this.api.temperatureProfile(element).subscribe(
      data => {
        showLoaderTermChange.style.display = 'none';
        const tempChartDataObj =  data.tempChartData;
        const convChartDataObj =  data.convChartData;
        const chartTempData = [
          {data: JSON.parse(JSON.stringify(tempChartDataObj.top)), label: this.translate.instant('Top'),
          type: 'line', radius: 0, fill: false, borderColor: 'rgb(0,0,255)', backgroundColor: 'rgb(0,0,255)', borderWidth: 2},
          {data: JSON.parse(JSON.stringify(tempChartDataObj.bottom)), label: this.translate.instant('Bottom'),
          type: 'line', radius: 0, fill: false, borderColor: 'rgb(0,192,192)', backgroundColor: 'rgb(0,192,192)', borderWidth: 2},
          {data: JSON.parse(JSON.stringify(tempChartDataObj.left)), label: this.translate.instant('Left'),
          type: 'line', radius: 0, fill: false, borderColor: 'rgb(0,255,255)', backgroundColor: 'rgb(0,255,255)', borderWidth: 2},
          {data: JSON.parse(JSON.stringify(tempChartDataObj.right)), label: this.translate.instant('Right'),
          type: 'line', radius: 0, fill: false, borderColor: 'rgb(0,255,0)', backgroundColor: 'rgb(0,255,0)', borderWidth: 2},
          {data: JSON.parse(JSON.stringify(tempChartDataObj.front)), label: this.translate.instant('Front'),
          type: 'line', radius: 0, fill: false, borderColor: 'rgb(255,0,0)', backgroundColor: 'rgb(255,0,0)', borderWidth: 2},
          {data: JSON.parse(JSON.stringify(tempChartDataObj.rear)), label: this.translate.instant('Rear'),
          type: 'line', radius: 0, fill: false, borderColor: 'rgb(255,0,255)', backgroundColor: 'rgb(255,0,255)', borderWidth: 2}
        ];
        const chartConvData = [
          {data: JSON.parse(JSON.stringify(convChartDataObj.top)), label: this.translate.instant('Top'),
          type: 'line', radius: 0, fill: false, borderColor: 'rgb(0,0,255)', backgroundColor: 'rgb(0,0,255)', borderWidth: 2},
          {data: JSON.parse(JSON.stringify(convChartDataObj.bottom)), label: this.translate.instant('Bottom'),
          type: 'line', radius: 0, fill: false, borderColor: 'rgb(0,192,192)', backgroundColor: 'rgb(0,192,192)', borderWidth: 2},
          {data: JSON.parse(JSON.stringify(convChartDataObj.left)), label: this.translate.instant('Left'),
          type: 'line', radius: 0, fill: false, borderColor: 'rgb(0,255,255)', backgroundColor: 'rgb(0,255,255)', borderWidth: 2},
          {data: JSON.parse(JSON.stringify(convChartDataObj.right)), label: this.translate.instant('Right'),
          type: 'line', radius: 0, fill: false, borderColor: 'rgb(0,255,0)', backgroundColor: 'rgb(0,255,0)', borderWidth: 2},
          {data: JSON.parse(JSON.stringify(convChartDataObj.front)), label: this.translate.instant('Front'),
          type: 'line', radius: 0, fill: false, borderColor: 'rgb(255,0,0)', backgroundColor: 'rgb(255,0,0)', borderWidth: 2},
          {data: JSON.parse(JSON.stringify(convChartDataObj.rear)), label: this.translate.instant('Rear'),
          type: 'line', radius: 0, fill: false, borderColor: 'rgb(255,0,255)', backgroundColor: 'rgb(255,0,255)', borderWidth: 2}
        ];
        this.tempChartData =  chartTempData;
        this.convChartData =  chartConvData;

        this.tempChartOptions = {
          animation: false,
          responsive: false,
          legend: {
            onClick: (e) => e.stopPropagation(),
            position: 'right',
            labels: {
              padding: 20
            }
          },
          hoverMode: 'index',
          stacked: false,
          title: {
              display: false,
              text: 'Chart 1',
              fontColor: '#000',
              fontSize: 20
          },
          scales: {
              xAxes: [{
                  type: 'linear',
                  display: true,
                  scaleLabel: {
                      display: true,
                      labelString: this.translate.instant(this.symbol.timePositionSymbol),
                      fontColor: '#f00',
                      fontSize: 20
                  },
              }],
              yAxes: [{
                  type: 'linear',
                  display: true,
                  id: 'y-axis-1',
                  scaleLabel: {
                      display: true,
                      labelString: this.translate.instant(this.symbol.temperatureSymbol),
                      fontColor: '#f00',
                      fontSize: 20
                  },
                  ticks: {
                      stepSize : 10
                  }
              }],
          }
        };
        this.convChartOptions = {
          animation: false,
          responsive: false,
          legend: {
            onClick: (e) => e.stopPropagation(),
            position: 'right',
            labels: {
              padding: 20
            }
          },
          hoverMode: 'index',
          stacked: false,
          title: {
            display: false,
            text: 'Chart 1',
            fontColor: '#000',
            fontSize: 20
          },
          scales: {
            xAxes: [{
                type: 'linear',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: this.translate.instant(this.symbol.timePositionSymbol),
                    fontColor: '#f00',
                    fontSize: 20
                },
            }],
            yAxes: [{
              type: 'linear',
              display: true,
              id: 'y-axis-1',
              scaleLabel: {
                  display: true,
                  labelString: this.translate.instant(this.symbol.convectionCoeffSymbol),
                  fontColor: '#f00',
                  fontSize: 20
              },
              ticks: {
                  min: data.minScaleConv,
                  max: data.maxScaleConv,
              }
            }],
          }
        };
      }
    );
  }
  loadEstimationValue(value) {
    const showLoaderChange = <HTMLElement>document.getElementById('showLoaderChange');
    showLoaderChange.style.display = 'block';
    const params: ApiService.SizingEstimationResultParams = {
      idStudy: this.study.ID_STUDY,
      tr: value
    };
    this.api.sizingEstimationResult(params).subscribe(
      data => {
        this.sizingEstimationValue = data.result;
        showLoaderChange.style.display = 'none';
      }
    );
  }
  loadEquipmentEstimationChart() {
    console.log(this.selectedEquip);
    const showLoaderChange = <HTMLElement>document.getElementById('showLoaderChange');
    showLoaderChange.style.display = 'block';
    const element = this.selectedEquip;
    const params: ApiService.SizingEstimationResultParams = {
      idStudy: this.study.ID_STUDY
    };
    this.api.sizingEstimationResult(params).subscribe(
      data => {
        showLoaderChange.style.display = 'none';
        this.dataGraphChart = data.dataGraphChart;
        const dataCustomFlowRate = [];
        const dataDhp = [];
        const dataDhpMax = [];
        const dataConso = [];
        const dataConsoMax = [];
        for (let j = 0; j < Object.keys(data.dataGraphChart).length; j++) {
          if (data.dataGraphChart[j].id == element) {
            const objDataGraph = data.dataGraphChart[j].data;
            const dataGrapChartLength = Object.keys(objDataGraph).length;
            dataCustomFlowRate.push(objDataGraph[0].dhp);
            dataDhp.push(0);
            dataDhpMax.push(0);
            dataConso.push(0);
            dataConsoMax.push(0);
            for (let i = dataGrapChartLength - 1; i >= 0; i--) {
              dataCustomFlowRate.push(objDataGraph[i].dhp);
              dataDhp.push(objDataGraph[i].dhp);
              dataDhpMax.push(objDataGraph[i].dhpMax);
              dataConso.push(objDataGraph[i].conso);
              dataConsoMax.push(objDataGraph[i].consoMax);
            }
            dataCustomFlowRate.push(objDataGraph[0].dhp);
            dataDhp.push(0);
            dataDhpMax.push(0);
            dataConso.push(0);
            dataConsoMax.push(0);
            console.log(dataCustomFlowRate);
            const chartEstimationData = [
              {data: JSON.parse(JSON.stringify(dataCustomFlowRate)), label: this.translate.instant('Custom flow rate'),
              type: 'line', radius: 0, fill: false, borderColor: '#f00', borderWidth: 2},
              {data: JSON.parse(JSON.stringify(dataDhp)), label: this.translate.instant('Product flowrate'),
                      backgroundColor: 'rgb(0, 0, 255)'},
              {data: JSON.parse(JSON.stringify(dataDhpMax)), label: this.translate.instant('Maximum product flowrate'),
                      backgroundColor: 'rgb(153, 204, 255)'},
              {data: JSON.parse(JSON.stringify(dataConso)),
                      label: this.translate.instant('Cryogen consumption (product + equipment heat losses)'),
                      backgroundColor: 'rgb(51, 204, 51)', yAxisID: 'y-axis-2'},
              {data: JSON.parse(JSON.stringify(dataConsoMax)),
                      label: this.translate.instant('Maximum cryogen consumption (product + equipment heat losses)'),
                      backgroundColor: 'rgb(102, 255, 153)', yAxisID: 'y-axis-2'}
            ];
            this.graphEstimationData = chartEstimationData;
          }
        }
        if (this.myGraphEstimationData) {
          this.myGraphEstimationData.chart.config.data.labels = this.graphEstimationLabels;
        }
        console.log(this.graphEstimationData);
      }
    );
  }
}
