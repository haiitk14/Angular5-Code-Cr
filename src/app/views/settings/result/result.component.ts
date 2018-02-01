import { Component, OnInit } from '@angular/core';
import { TempRecordPtsDef } from '../../../api/models/temp-record-pts-def';
import { ApiService } from '../../../api/services';
import { AfterViewInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, AfterViewInit {
  public temprecordptsdef: TempRecordPtsDef;
  public laddaSavingResult = false;
  public isLoading = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.isLoading = true;
  }

  ngAfterViewInit() {
    this.isLoading = true;
    this.api.getMyTempRecordPtsDef().subscribe(
      data => {
        data.AXIS1_PT_TOP_SURF_DEF = Number(Number(data.AXIS1_PT_TOP_SURF_DEF).toPrecision(3));
        data.AXIS2_PT_TOP_SURF_DEF = Number(Number(data.AXIS2_PT_TOP_SURF_DEF).toPrecision(3));
        data.AXIS3_PT_TOP_SURF_DEF = Number(Number(data.AXIS3_PT_TOP_SURF_DEF).toPrecision(3));

        data.AXIS1_PT_INT_PT_DEF = Number(Number(data.AXIS1_PT_INT_PT_DEF).toPrecision(3));
        data.AXIS2_PT_INT_PT_DEF = Number(Number(data.AXIS2_PT_INT_PT_DEF).toPrecision(3));
        data.AXIS3_PT_INT_PT_DEF = Number(Number(data.AXIS3_PT_INT_PT_DEF).toPrecision(3));

        data.AXIS1_PT_BOT_SURF_DEF = Number(Number(data.AXIS1_PT_BOT_SURF_DEF).toPrecision(3));
        data.AXIS2_PT_BOT_SURF_DEF = Number(Number(data.AXIS2_PT_BOT_SURF_DEF).toPrecision(3));
        data.AXIS3_PT_BOT_SURF_DEF = Number(Number(data.AXIS3_PT_BOT_SURF_DEF).toPrecision(3));

        data.AXIS2_PL_1_3_DEF = Number(Number(data.AXIS2_PL_1_3_DEF).toPrecision(3));
        data.AXIS3_PL_1_2_DEF = Number(Number(data.AXIS3_PL_1_2_DEF).toPrecision(3));
        data.AXIS1_PL_2_3_DEF = Number(Number(data.AXIS1_PL_2_3_DEF).toPrecision(3));

        data.AXIS2_AX_1_DEF = Number(Number(data.AXIS2_AX_1_DEF).toPrecision(3));
        data.AXIS3_AX_1_DEF = Number(Number(data.AXIS3_AX_1_DEF).toPrecision(3));

        data.AXIS1_AX_2_DEF = Number(Number(data.AXIS1_AX_2_DEF).toPrecision(3));
        data.AXIS3_AX_2_DEF = Number(Number(data.AXIS3_AX_2_DEF).toPrecision(3));

        data.AXIS1_AX_3_DEF = Number(Number(data.AXIS1_AX_3_DEF).toPrecision(3));
        data.AXIS2_AX_3_DEF = Number(Number(data.AXIS2_AX_3_DEF).toPrecision(3));

        this.temprecordptsdef = data;
        console.log(data);
        this.isLoading = false;
      }
    );
  }

  saveMyTempRecordPtsDef() {
    this.laddaSavingResult = true;
    this.api.saveMyTempRecordPtsDef({
      axis1TopSurf: Number(this.temprecordptsdef.AXIS1_PT_TOP_SURF_DEF),
      axis2TopSurf: Number(this.temprecordptsdef.AXIS2_PT_TOP_SURF_DEF),
      axis3TopSurf: Number(this.temprecordptsdef.AXIS3_PT_TOP_SURF_DEF),
      axis1IntPt: Number(this.temprecordptsdef.AXIS1_PT_INT_PT_DEF),
      axis2IntPt: Number(this.temprecordptsdef.AXIS2_PT_INT_PT_DEF),
      axis3IntPt: Number(this.temprecordptsdef.AXIS3_PT_INT_PT_DEF),
      axis1BotSurf: Number(this.temprecordptsdef.AXIS1_PT_BOT_SURF_DEF),
      axis2BotSurf: Number(this.temprecordptsdef.AXIS2_PT_BOT_SURF_DEF),
      axis3BotSurf: Number(this.temprecordptsdef.AXIS3_PT_BOT_SURF_DEF),
      axis2PL13: Number(this.temprecordptsdef.AXIS2_PL_1_3_DEF),
      axis3PL12: Number(this.temprecordptsdef.AXIS3_PL_1_2_DEF),
      axis1PL23: Number(this.temprecordptsdef.AXIS1_PL_2_3_DEF),
      axis2Axe1: Number(this.temprecordptsdef.AXIS2_AX_1_DEF),
      axis3Axe1: Number(this.temprecordptsdef.AXIS3_AX_1_DEF),
      axis1Axe2: Number(this.temprecordptsdef.AXIS1_AX_2_DEF),
      axis3Axe2: Number(this.temprecordptsdef.AXIS3_AX_2_DEF),
      axis1Axe3: Number(this.temprecordptsdef.AXIS1_AX_3_DEF),
      axis2Axe3: Number(this.temprecordptsdef.AXIS2_AX_3_DEF)
    }).subscribe(
      response => {
        console.log(response);
        swal('Success', 'Save result setting completed', 'success');
      },
      err => {
      },
      () => {
        this.laddaSavingResult = false;
      }
    );
  }
}
