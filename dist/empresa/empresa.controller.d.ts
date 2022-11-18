import { EmpresaService } from './empresa.service';
import { EmpresautilService } from './empresa.util.service';
export declare class EmpresaController {
    private empresaService;
    private empresaUtilService;
    constructor(empresaService: EmpresaService, empresaUtilService: EmpresautilService);
    getEmpresa(contrato: string, fornecedor: string, codigoEmpresa: string): Promise<import("../contrato/contrato.dto").Empresa>;
    getFornecedor(contrato: string, fornecedor: string, codigoEmpresa: string): Promise<any>;
}
