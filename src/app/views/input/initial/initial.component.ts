import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AfterViewInit, AfterContentChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { ApiService } from '../../../api/services/api.service';
import { Study, Product, ViewProduct, ViewMesh } from '../../../api/models';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import { TextService } from '../../../shared/text.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss']
})
export class InitialComponent implements OnInit, AfterContentChecked, AfterViewInit {
  public study: Study;
  public productShape: number;
  public productView: ViewProduct;
  public meshView: ViewMesh;
  public laddaGeneratingMesh = false;
  public laddaInitializingTemp = false;
  public productTempForm: {
    flagIsoTemp: boolean,
    initTemp: number
  };

  // renderer = new THREE.WebGLRenderer({ alpha: true });
  // scene = null;
  // camera = null;
  // mesh = null;
  // materials = null;
  // orbit = null;

  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  @ViewChild('isoTempEditModal') isoTempEditModal: ModalDirective;

  constructor(private api: ApiService, private router: Router, private text: TextService) {}

  ngOnInit() {
    this.productTempForm = {
      flagIsoTemp: false,
      initTemp: 0.0
    };
    this.productShape = Number(localStorage.getItem('productShape'));
    this.productView = {
      elements: []
    };
    this.meshView = new ViewMesh();
  }

  ngAfterViewInit() {
    if (this.productShape == 0 || !this.productView.elements || this.productView.elements.length == 0) {
      return;
    }
    this.api.getMeshView(this.productView.product.ID_PROD).subscribe(
      (resp: ViewMesh) => {
        this.initMeshView(resp);
      },
      (err) => {
        console.log(err);
        // swal('Oops..', 'Error getting mesh view', 'error');
      }
    );
  }

  // animate() {
  //   window.requestAnimationFrame(() => this.animate());
  //   this.orbit.update();
  //   this.renderer.render(this.scene, this.camera);
  // }

  ngAfterContentChecked() {
    this.productShape = Number(localStorage.getItem('productShape'));
    this.study = JSON.parse(localStorage.getItem('study'));
    this.productView = JSON.parse(localStorage.getItem('productView'));
    if (this.productShape == 0 || !this.productView.elements || this.productView.elements.length == 0) {
      swal('Oops..', 'Please define product along with elements first', 'error');
      this.router.navigate(['/input/product']);
      return false;
    }
  }

  generateMesh() {
    swal('Warning', 'Feature is not yet implement, please use default mesh generator!', 'warning');
    // this.laddaGeneratingMesh = true;
    // this.api.generateMesh(this.productView.product.ID_PROD).subscribe(
    //   resp => {
    //     console.log(resp);
    //   },
    //   error2 => {
    //     console.log(error2);
    //   },
    //   () => {
    //     this.laddaGeneratingMesh = false;
    //   }
    // );
  }

  editInitialMesh() {

  }

  initMeshView(resp: ViewMesh) {
    this.meshView = resp;
    console.log(resp);
    if (!this.meshView.meshGeneration) {
      this.resetDefaultMesh();
    } else {
      localStorage.setItem('meshView', JSON.stringify(this.meshView));
    }

    this.productTempForm.flagIsoTemp = this.productView.product.PROD_ISO != 0;
    if (this.productTempForm.flagIsoTemp) {
      this.productTempForm.initTemp = this.meshView.productIsoTemp;
    }

    // this.scene = new THREE.Scene();

    // this.camera = new THREE.PerspectiveCamera(75, 600 / 400, 1, 10000);
    // this.camera.position.z = 400;

    // // this.createRubixMaterial();

    // let geometry = null;
    // switch (this.productShape) {
    //   case this.text.shapeNames.BREAD:
    //   case this.text.shapeNames.REC_LAY:
    //   case this.text.shapeNames.REC_STAND:
    //   case this.text.shapeNames.SLAB:
    //     geometry = new THREE.BoxGeometry(200, 200, 200);
    //     break;

    //   case this.text.shapeNames.SPHERE:
    //     geometry = new THREE.SphereGeometry(200);
    //     break;

    //   case this.text.shapeNames.CON_CYL_LAY:
    //   case this.text.shapeNames.CON_CYL_STAND:
    //   case this.text.shapeNames.CYL_LAY:
    //   case this.text.shapeNames.CYL_STAND:
    //     geometry = new THREE.CylinderGeometry(150, 150, 300);
    //     break;

    //   default:
    //     return false;
    // }

    // // var meshFaceMaterial = new THREE.MeshFaceMaterial(this.materials);
    // this.materials = new THREE.MeshBasicMaterial({
    //   color: 0x333333,
    //   wireframe: true
    // });
    // this.mesh = new THREE.Mesh(geometry, this.materials);
    // const axisHelper = new THREE.AxisHelper(120);
    // this.scene.add(axisHelper);

    // this.scene.add(this.mesh);

    // this.renderer.setPixelRatio(window.devicePixelRatio);
    // this.renderer.setSize(180, 200);

    // this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
    // this.orbit.enableZoom = true;
    // // this.renderer.domElement.style.display = 'block';
    // // this.renderer.domElement.style.margin = 'auto';
    // this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    // this.orbit.update();

    // this.animate();
  }

  resetDefaultMesh() {
    this.laddaGeneratingMesh = true;
    this.api.refreshMesh(this.study.ID_STUDY).subscribe(
      data => {
        this.api.generateDefaultMesh(this.productView.product.ID_PROD).subscribe(
          (resp: ViewMesh) => {
            this.initMeshView(resp);
          },
          err => {
            console.log(err);
          },
          () => {

          }
        );
      },
      err => {

      },
      () => {
        this.laddaGeneratingMesh = false;
      }
    );
  }

  initTemperature() {
    if (isNaN(this.productTempForm.initTemp)) {
      swal('Error', 'Please correctly define initial product temperature!', 'error');
      return false;
    }

    this.laddaInitializingTemp = true;
    this.api.initTemperature({
      idProd: this.productView.product.ID_PROD,
      initTemp: this.meshView.productIsoTemp
    }).subscribe(
      (resp) => {
        console.log(resp);
        this.laddaInitializingTemp = false;
      },
      (err) => {
        console.log(err);
        this.laddaInitializingTemp = false;
      },
      () => {
        console.log('call init temp finished');
        this.laddaInitializingTemp = false;
      }
    );
  }

  editProductTemp() {
    this.isoTempEditModal.show();
  }

  saveProductInitTemp() {
    this.isoTempEditModal.hide();
    if (!this.productTempForm.flagIsoTemp) {
      swal('Warning', 'Feature of non-isothermal product init temperature is not yet implement!', 'warning');
      this.productTempForm.flagIsoTemp = true;
      return false;
    }
    this.meshView.productIsoTemp = this.productTempForm.initTemp;
  }

}
