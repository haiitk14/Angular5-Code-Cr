import { Component, OnInit } from '@angular/core';
import { MeshParamDef } from '../../../api/models/mesh-param-def';
import { ApiService } from '../../../api/services';
import { AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mesh',
  templateUrl: './mesh.component.html',
  styleUrls: ['./mesh.component.scss']
})
export class MeshComponent implements OnInit, AfterViewInit {

  public meshparamdef: MeshParamDef;
  public laddaSavingMesh = false;
  public isLoading = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.isLoading = true;
  }

  ngAfterViewInit() {
    this.isLoading = true;
    this.api.getMyMeshParamDef().subscribe(
      data => {
        data.MESH_1_SIZE = Number(Number(data.MESH_1_SIZE).toPrecision(3));
        data.MESH_2_SIZE = Number(Number(data.MESH_2_SIZE).toPrecision(3));
        data.MESH_3_SIZE = Number(Number(data.MESH_3_SIZE).toPrecision(3));
        this.meshparamdef = data;
        this.isLoading = false;
     }
    );
  }

  saveMyMeshParamDef() {
    this.laddaSavingMesh = true;
    this.api.saveMyMeshParamDef({
      dim1: Number(this.meshparamdef.MESH_1_SIZE),
      dim2: Number(this.meshparamdef.MESH_2_SIZE),
      dim3: Number(this.meshparamdef.MESH_3_SIZE)
    }).subscribe(
      response => {
        console.log(response);
        swal('Success', 'Save mesh setting completed', 'success');
      },
      err => {
        console.log(err);
      },
      () => {
        this.laddaSavingMesh = false;
      }
    );
  }
}
