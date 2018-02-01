import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
import { ViewChild, Output } from '@angular/core';
import { ApiService } from '../../../api/services';
import { CalculatorService } from '../../../api/services/calculator.service';
import { OptimumCalculator } from '../../../api/models/optimum-calculator';
import { BrainCalculator } from '../../../api/models/brain-calculator';
import { Study } from '../../../api/models/study';
import { ViewBrainOptim } from '../../../api/models/view-brain-optim';
import { ViewProgressBar } from '../../../api/models/view-progress-bar';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, AfterViewInit {
  @ViewChild('calcModal') calcModal;
  @ViewChild('estimationMode') estimationMode;
  @ViewChild('brainCalculate') brainCalculate;
  @ViewChild('refineModal') refineMode;
  @ViewChild('calculWithoutOpti') calculWithoutOpti;
  @ViewChild('calculWithOpti') calculWithOpti;
  @ViewChild('brainOptimum') brainOptimum;
  @Output() finishCalculate: EventEmitter<any> = new EventEmitter();
  public showSetting = false;
  public calculate: OptimumCalculator;
  public brainCalculator: BrainCalculator;
  public study: Study;
  public brainOptim: ViewBrainOptim;
  public laddaIsCalculating = false;
  public isLoading = false;
  public progressbar: ViewProgressBar;
  public studyEquipment: {
    id?: number,
    optimized?: boolean,
    typeCalculate?: number
  };

  public selectForm = {
    selected: false,
    value: 0
  };

  constructor(private modalService: BsModalService, private api: ApiService, private router: Router,
     private apicalculator: CalculatorService) { }

  ngOnInit() {
    if (localStorage.getItem('study')) {
      this.study = JSON.parse(localStorage.getItem('study'));
    }
    this.isLoading = true;
  }

  ngAfterViewInit() {
  }

  open() {
    this.isLoading = true;

    const params: CalculatorService.GetOptimumCalculatorParams = {
      idStudy: this.study.ID_STUDY,
      idStudyEquipment: null
    };

    if (this.study.CALCULATION_MODE == 1) {
      this.isLoading = false;
      this.estimationMode.show();
      // this.loadProgressBar();
      // this.brainOptimum.show();
    } else if (this.study.CALCULATION_MODE == 2) {
      this.isLoading = false;
      this.calcModal.show();
    } else if (this.study.CALCULATION_MODE == 3) {
      this.apicalculator.getOptimumCalculator(params).subscribe(
        data => {
          this.calculate = data;
          if (Number(data.timeStep) == -1) {
            swal('Oops..', 'All equipments selected to be calculated have some results. Please, go to analytic results output.', 'error');
            this.router.navigate(['/output/preliminary']);
            this.calcModal.hide();
          }
          console.log(data);
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      );
      this.loadProgressBar();
      this.calcModal.show();
    }
  }

  openRefine(idStudyEquipment: number, isOptimized: boolean, type: number) {
    this.isLoading = true;
    const params: ApiService.GetStudyEquipmentCalculationParams = {
      idStudy: this.study.ID_STUDY,
      idStudyEquipment: idStudyEquipment,
      checkOptim: isOptimized,
      type: type
    };

    this.api.getStudyEquipmentCalculation(params).subscribe(
      data => {
        this.brainCalculator = data;
        console.log(data);
        localStorage.setItem('studyEquipment', JSON.stringify({ id: idStudyEquipment, optimized: isOptimized, typeCalculate: type }));
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
    this.refineMode.show();
  }

  openBrain(idStudyEquipment: number) {
    this.isLoading = true;
    const params: ApiService.GetStudyEquipmentCalculationParams = {
      idStudy: this.study.ID_STUDY,
      idStudyEquipment: idStudyEquipment,
      checkOptim: null,
      type: null
    };

    this.api.getStudyEquipmentCalculation(params).subscribe(
      data => {
        this.brainCalculator = data;
        localStorage.setItem('studyEquipment', JSON.stringify({ id: idStudyEquipment, optimized: null }));
        console.log(data);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
    this.brainCalculate.show();
  }

  openSetting() {
    const table = <HTMLElement>document.getElementById('optimumSettings');
    this.showSetting = !this.showSetting;
    if (this.showSetting) {
      table.style.display = 'block';
    } else {
      table.style.display = 'none';
    }
  }

  hideSetting() {
    const table = <HTMLElement>document.getElementById('brainSetting');
    this.showSetting = !this.showSetting;
    if (this.showSetting) {
      table.style.display = 'block';
    } else {
      table.style.display = 'none';
    }
  }

  startCalculate() {
    this.laddaIsCalculating = true;
    this.apicalculator.startCalculate({
      idStudy: this.study.ID_STUDY,
      idStudyEquipment: null,
      checkOptim: Number(this.calculate.checkOptim),
      epsilonTemp: Number(this.calculate.epsilonTemp),
      epsilonEnth: Number(this.calculate.epsilonEnth),
      nbOptimIter: Number(this.calculate.nbOptimIter),
      timeStep: Number(this.calculate.timeStep),
      precision: Number(this.calculate.precision),
      scheckStorage: Number(this.calculate.scheckStorage),
      sdisableOptim: Number(this.calculate.sdisableOptim),
      storagestep: Number(this.calculate.storagestep),
      hRadioOn: Number(this.calculate.hRadioOn),
      vRadioOn: Number(this.calculate.vRadioOn),
      maxIter: Number(this.calculate.maxIter),
      relaxCoef: Number(this.calculate.relaxCoef),
      tempPtSurf: Number(this.calculate.tempPtSurf),
      tempPtIn: Number(this.calculate.tempPtIn),
      tempPtBot: Number(this.calculate.tempPtBot),
      tempPtAvg: Number(this.calculate.tempPtAvg),
      select1: this.calculate.select1,
      select2: this.calculate.select2,
      select3: this.calculate.select3,
      select4: this.calculate.select4,
      select5: this.calculate.select5,
      select6: this.calculate.select6,
      select7: this.calculate.select7,
      select8: this.calculate.select8,
      select9: this.calculate.select9,

    }).subscribe(
      (response: any[]) => {
        this.laddaIsCalculating = false;
        let success = true;
        for (let i = 0; i < response.length; i++) {
          const element = response[i];
          if (element !== 0) {
            success = false;
            break;
          }
        }

        if (success) {
          this.router.navigate(['/output/preliminary']);
        } else {
          this.router.navigate(['/calculation/calculation-status']);
        }
      },
      err => {
        if (err.length > 0) {
          this.router.navigate(['/calculation/calculation-status']);
        }
        this.laddaIsCalculating = false;
      },
      () => {
        this.laddaIsCalculating = false;
      }
      );
  }

  startEstimation() {
    this.laddaIsCalculating = true;
    if (this.study.OPTION_CRYOPIPELINE) {
      swal('Oops..', 'This calculate does not have enabled CryoPipeline calculation option', 'error');
      this.router.navigate(['/input/objectives']);
    }

    if (this.study.OPTION_EXHAUSTPIPELINE) {
      swal('Oops..', 'This calculate does not have enabled ExhaustPipeline calculation option', 'error');
      this.router.navigate(['/input/objectives']);
    }

    this.api.startStudyCalculation(this.study.ID_STUDY).subscribe(
      (resp: any[]) => {
        this.laddaIsCalculating = false;
        let success = true;
        for (let i = 0; i < resp.length; i++) {
          const element = resp[i];
          if (element !== 0) {
            success = false;
            break;
          }
        }
        if (success) {
          this.router.navigate(['/output/preliminary']);
        } else {
          this.router.navigate(['/calculation/calculation-status']);
        }
      },
      err => {
        if (err.length > 0) {
          this.router.navigate(['/calculation/calculation-status']);
        }
        this.laddaIsCalculating = false;
      },
      () => {
        this.laddaIsCalculating = false;
      }
    );
  }

  startBrainOptimumCalculate() {
    this.studyEquipment = JSON.parse(localStorage.getItem('studyEquipment'));
    console.log(this.studyEquipment);
    this.laddaIsCalculating = true;
    this.api.startBrainCalculate({
      idStudy: this.study.ID_STUDY,
      idStudyEquipment: this.studyEquipment.id,
      checkOptim: this.studyEquipment.optimized,
      typeCalculate: this.studyEquipment.typeCalculate,
      dwellingTimes: this.brainCalculator.dwellingTimes,
      temperatures: this.brainCalculator.temperatures,
      toc: this.brainCalculator.toc,
      timeStep: this.brainCalculator.timeStep,
      precision: this.brainCalculator.precision,
      scheckStorage: this.brainCalculator.scheckStorage,
      storagestep: this.brainCalculator.storagestep,
      hRadioOn: Number(this.brainCalculator.hRadioOn),
      vRadioOn: Number(this.brainCalculator.vRadioOn),
      maxIter: Number(this.brainCalculator.maxIter),
      relaxCoef: Number(this.brainCalculator.relaxCoef),
      tempPtSurf: Number(this.brainCalculator.tempPtSurf),
      tempPtIn: Number(this.brainCalculator.tempPtIn),
      tempPtBot: Number(this.brainCalculator.tempPtBot),
      tempPtAvg: Number(this.brainCalculator.tempPtAvg),
      select1: this.brainCalculator.select1,
      select2: this.brainCalculator.select2,
      select3: this.brainCalculator.select3,
      select4: this.brainCalculator.select4,
      select5: this.brainCalculator.select5,
      select6: this.brainCalculator.select6,
      select7: this.brainCalculator.select7,
      select8: this.brainCalculator.select8,
      select9: this.brainCalculator.select9,
    }).subscribe(
      (response) => {
        this.laddaIsCalculating = false;
        let success = true;

        if (response !== 0) {
          success = false;
        }

        if (success) {
          this.router.navigate(['/output/preliminary']);
          this.refineMode.hide();
          this.finishCalculate.emit(success);
        } else {
          this.router.navigate(['/calculation/calculation-status']);
        }
      },
      err => {
        if (err.length > 0) {
          this.router.navigate(['/calculation/calculation-status']);
        }
        this.laddaIsCalculating = false;
      },
      () => {
        this.laddaIsCalculating = false;
      }
    );
  }

  startBrainEstimationCalculate() {
    this.studyEquipment = JSON.parse(localStorage.getItem('studyEquipment'));
    this.laddaIsCalculating = true;
    this.apicalculator.startCalcul({
      idStudy: this.study.ID_STUDY,
      idStudyEquipment: this.studyEquipment.id,
      hRadioOn: Number(this.brainCalculator.hRadioOn),
      vRadioOn: Number(this.brainCalculator.vRadioOn),
      maxIter: Number(this.brainCalculator.maxIter),
      relaxCoef: Number(this.brainCalculator.relaxCoef),
      precision: Number(this.brainCalculator.precision),
      tempPtSurf: Number(this.brainCalculator.tempPtSurf),
      tempPtIn: Number(this.brainCalculator.tempPtIn),
      tempPtBot: Number(this.brainCalculator.tempPtBot),
      tempPtAvg: Number(this.brainCalculator.tempPtAvg),
      precisionlogstep: Number(this.brainCalculator.precisionlogstep),
      timeStep: Number(this.brainCalculator.timeStep),
      storagestep: Number(this.brainCalculator.storagestep),
      select1: this.brainCalculator.select1,
      select2: this.brainCalculator.select2,
      select3: this.brainCalculator.select3,
      select4: this.brainCalculator.select4,
      select5: this.brainCalculator.select5,
      select6: this.brainCalculator.select6,
      select7: this.brainCalculator.select7,
      select8: this.brainCalculator.select8,
      select9: this.brainCalculator.select9,
    }).subscribe(
      (response: any[]) => {
        this.laddaIsCalculating = false;
        let success = true;
        for (let i = 0; i < response.length; i++) {
          const element = response[i];
          if (element !== 0) {
            success = false;
            break;
          }
        }

        if (success) {
          this.router.navigate(['/output/preliminary']);
          this.calculWithoutOpti.hide();
          this.finishCalculate.emit(success);
        } else {
          this.router.navigate(['/calculation/calculation-status']);
        }
      },
      err => {
        if (err.length > 0) {
          this.router.navigate(['/calculation/calculation-status']);
        }
        this.laddaIsCalculating = false;
      },
      () => {
        this.laddaIsCalculating = false;
      }
    );
  }

  saveCalculOptim() {
    this.studyEquipment = JSON.parse(localStorage.getItem('studyEquipment'));
    this.apicalculator.calculOptim({
      idStudy: this.study.ID_STUDY,
      idStudyEquipment: this.studyEquipment.id,
      hRadioOn: Number(this.brainCalculator.hRadioOn),
      vRadioOn: Number(this.brainCalculator.vRadioOn),
      maxIter: Number(this.brainCalculator.maxIter),
      relaxCoef: Number(this.brainCalculator.relaxCoef),
      precision: Number(this.brainCalculator.precision),
      tempPtSurf: Number(this.brainCalculator.tempPtSurf),
      tempPtIn: Number(this.brainCalculator.tempPtIn),
      tempPtBot: Number(this.brainCalculator.tempPtBot),
      tempPtAvg: Number(this.brainCalculator.tempPtAvg),
      precisionlogstep: Number(this.brainCalculator.precisionlogstep),
      timeStep: Number(this.brainCalculator.timeStep),
      storagestep: Number(this.brainCalculator.storagestep),
      select1: this.brainCalculator.select1,
      select2: this.brainCalculator.select2,
      select3: this.brainCalculator.select3,
      select4: this.brainCalculator.select4,
      select5: this.brainCalculator.select5,
      select6: this.brainCalculator.select6,
      select7: this.brainCalculator.select7,
      select8: this.brainCalculator.select8,
      select9: this.brainCalculator.select9,
    }).subscribe(
      response => {

      },
      err => {

      },
      () => {
      }
    );
  }

  loadBrainOptim() {
    this.studyEquipment = JSON.parse(localStorage.getItem('studyEquipment'));
    this.apicalculator.getBrainOptim({
      idStudyEquipment: this.studyEquipment.id,
      brainoptim: null
    }).subscribe(
      data => {
        this.brainOptim = data;
        console.log(data);
      },
      err => {

      },
      () => {
      }
    );
  }

  startBrainCalculOptim() {
    this.studyEquipment = JSON.parse(localStorage.getItem('studyEquipment'));
    this.laddaIsCalculating = true;
    this.apicalculator.startCalculOptim({
      BRAIN_OPTIM: this.brainOptim.BRAIN_OPTIM,
      BRAIN_OPTIM_COSTFIXED: this.brainOptim.BRAIN_OPTIM_COSTFIXED,
      BRAIN_OPTIM_DHPFIXED: this.brainOptim.BRAIN_OPTIM_DHPFIXED,
      BRAIN_OPTIM_TOPFIXED: this.brainOptim.BRAIN_OPTIM_TOPFIXED,
      BRAIN_OPTIM_TRFIXED: this.brainOptim.BRAIN_OPTIM_TRFIXED,
      BRAIN_OPTIM_TSFIXED: this.brainOptim.BRAIN_OPTIM_TSFIXED,
      idStudy: this.study.ID_STUDY,
      idStudyEquipment: this.studyEquipment.id
    }).subscribe(
      (response: any[]) => {
        this.laddaIsCalculating = false;
        let success = true;
        for (let i = 0; i < response.length; i++) {
          const element = response[i];
          if (element !== 0) {
            success = false;
            break;
          }
        }

        if (success) {
          this.calculWithOpti.hide();
          this.router.navigate(['/output/preliminary']);
          this.finishCalculate.emit(success);
        } else {
          this.router.navigate(['/calculation/calculation-status']);
        }
      },
      err => {
        if (err.length > 0) {
          this.router.navigate(['/calculation/calculation-status']);
        }
        this.laddaIsCalculating = false;
      },
      () => {
        this.laddaIsCalculating = false;
      }
    );
  }

  loadProgressBar() {
    this.apicalculator.getProgressBarStudyEquipment(this.study.ID_STUDY).subscribe(
      data => {
        this.progressbar = data;
        console.log(data);
      },
      err => {

      },
      () => {

      }
    );
  }
}
