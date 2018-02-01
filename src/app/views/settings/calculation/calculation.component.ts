import { Component, OnInit } from '@angular/core';
import { CalculationParametersDef } from '../../../api/models/calculation-parameters-def';
import { ApiService } from '../../../api/services';
import { AfterViewInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit, AfterViewInit {
  public calculationparametersdef: CalculationParametersDef;
  public laddaSavingcalculation = false;
  public isLoading = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.isLoading = true;
  }

  ngAfterViewInit() {
    this.api.getMyCalculationParametersDef().subscribe(
      data => {
        data.VERT_SCAN_DEF = Number(Number(data.VERT_SCAN_DEF).toPrecision(3));
        data.HORIZ_SCAN_DEF = Number(Number(data.HORIZ_SCAN_DEF).toPrecision(3));

        data.MAX_IT_NB_DEF = Number(Number(data.MAX_IT_NB_DEF).toPrecision(3));
        data.RELAX_COEFF_DEF = Number(Number(data.RELAX_COEFF_DEF).toPrecision(3));
        data.PRECISION_REQUEST_DEF = Number(Number(data.PRECISION_REQUEST_DEF).toPrecision(3));

        data.STOP_TOP_SURF_DEF = Number(Number(data.STOP_TOP_SURF_DEF).toPrecision(3));
        data.STOP_INT_DEF = Number(Number(data.STOP_INT_DEF).toPrecision(3));
        data.STOP_BOTTOM_SURF_DEF = Number(Number(data.STOP_BOTTOM_SURF_DEF).toPrecision(3));
        data.STOP_AVG_DEF = Number(Number(data.STOP_AVG_DEF).toPrecision(3));

        data.STUDY_ALPHA_TOP_FIXED_DEF = Number(Number(data.STUDY_ALPHA_TOP_FIXED_DEF).toPrecision(3));
        data.STUDY_ALPHA_BOTTOM_FIXED_DEF = Number(Number(data.STUDY_ALPHA_BOTTOM_FIXED_DEF).toPrecision(3));
        data.STUDY_ALPHA_LEFT_FIXED_DEF = Number(Number(data.STUDY_ALPHA_LEFT_FIXED_DEF).toPrecision(3));
        data.STUDY_ALPHA_RIGHT_FIXED_DEF = Number(Number(data.STUDY_ALPHA_RIGHT_FIXED_DEF).toPrecision(3));
        data.STUDY_ALPHA_FRONT_FIXED_DEF = Number(Number(data.STUDY_ALPHA_FRONT_FIXED_DEF).toPrecision(3));
        data.STUDY_ALPHA_REAR_FIXED_DEF = Number(Number(data.STUDY_ALPHA_REAR_FIXED_DEF).toPrecision(3));

        data.STUDY_ALPHA_TOP_DEF = Number(Number(data.STUDY_ALPHA_TOP_DEF).toPrecision(3));
        data.STUDY_ALPHA_BOTTOM_DEF = Number(Number(data.STUDY_ALPHA_BOTTOM_DEF).toPrecision(3));
        data.STUDY_ALPHA_LEFT_DEF = Number(Number(data.STUDY_ALPHA_LEFT_DEF).toPrecision(3));
        data.STUDY_ALPHA_RIGHT_DEF = Number(Number(data.STUDY_ALPHA_RIGHT_DEF).toPrecision(3));
        data.STUDY_ALPHA_FRONT_DEF = Number(Number(data.STUDY_ALPHA_FRONT_DEF).toPrecision(3));
        data.STUDY_ALPHA_REAR_DEF = Number(Number(data.STUDY_ALPHA_REAR_DEF).toPrecision(3));

        data.STORAGE_STEP_DEF = Number(Number(data.STORAGE_STEP_DEF).toPrecision(3));
        data.PRECISION_LOG_STEP_DEF = Number(Number(data.PRECISION_LOG_STEP_DEF).toPrecision(3));
        data.TIME_STEP_DEF = Number(Number(data.TIME_STEP_DEF).toPrecision(3));
        this.calculationparametersdef = data;
        console.log(data);
        this.isLoading = false;
      }
    );
  }

  saveMyCalculationParametersDef() {
    this.laddaSavingcalculation = true;
    this.api.saveMyCalculationParametersDef({
      ishorizScanDef: Number(this.calculationparametersdef.HORIZ_SCAN_DEF),
      maxIter: Number(this.calculationparametersdef.MAX_IT_NB_DEF),
      relaxCoef: Number(this.calculationparametersdef.RELAX_COEFF_DEF),
      precision: Number(this.calculationparametersdef.PRECISION_REQUEST_DEF),
      isVertScanDef: Number(this.calculationparametersdef.VERT_SCAN_DEF),
      stopTopSurfDef: Number(this.calculationparametersdef.STOP_TOP_SURF_DEF),
      stopIntDef: Number(this.calculationparametersdef.STOP_INT_DEF),
      stopBottomSurfDef: Number(this.calculationparametersdef.STOP_BOTTOM_SURF_DEF),
      stopAvgDef: Number(this.calculationparametersdef.STOP_AVG_DEF),
      isStudyAlphaTopFixedDef: Number(this.calculationparametersdef.STUDY_ALPHA_TOP_FIXED_DEF),
      isStudyAlphaBottomFixedDef: Number(this.calculationparametersdef.STUDY_ALPHA_BOTTOM_FIXED_DEF),
      isStudyAlphaLeftFixedDef: Number(this.calculationparametersdef.STUDY_ALPHA_LEFT_FIXED_DEF),
      isStudyAlphaRightFixedDef: Number(this.calculationparametersdef.STUDY_ALPHA_RIGHT_FIXED_DEF),
      isStudyAlphaFrontFixedDef: Number(this.calculationparametersdef.STUDY_ALPHA_FRONT_FIXED_DEF),
      isStudyAlphaRearFixedDef: Number(this.calculationparametersdef.STUDY_ALPHA_REAR_FIXED_DEF),
      studyAlphaTopDef: Number(this.calculationparametersdef.STUDY_ALPHA_TOP_DEF),
      studyAlphaBottomDef: Number(this.calculationparametersdef.STUDY_ALPHA_BOTTOM_DEF),
      studyAlphaLeftDef: Number(this.calculationparametersdef.STUDY_ALPHA_LEFT_DEF),
      studyAlphaRightDef: Number(this.calculationparametersdef.STUDY_ALPHA_RIGHT_DEF),
      studyAlphaFrontDef: Number(this.calculationparametersdef.STUDY_ALPHA_FRONT_DEF),
      studyAlphaRearDef: Number(this.calculationparametersdef.STUDY_ALPHA_REAR_DEF),
      storageStepDef: Number(this.calculationparametersdef.STORAGE_STEP_DEF),
      precisionLogStepDef: Number(this.calculationparametersdef.PRECISION_LOG_STEP_DEF),
      timeStepDef: Number(this.calculationparametersdef.TIME_STEP_DEF)

    }).subscribe(
      response => {
        console.log(response);
        swal('Success', 'Save calculation setting completed', 'success');
      },
      err => {
        console.log(err);
      },
      () => {
        this.laddaSavingcalculation = false;
      }
    );
  }
}
