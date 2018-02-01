/* tslint:disable */
import { MeshGeneration } from './mesh-generation';
import { ProductElmt } from './product-elmt';
import { MeshPosition } from './mesh-position';

/**
 */
export class ViewMesh {
    meshGeneration?: MeshGeneration;
    elements?: ProductElmt[];
    elmtMeshPositions?: MeshPosition[];
    productIsoTemp?: number;
}
