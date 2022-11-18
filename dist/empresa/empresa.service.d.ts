import { Empresa } from 'src/contrato/contrato.dto';
import { CriptoService } from 'src/cripto/cripto.service';
import { EmpresautilService } from './empresa.util.service';
export declare class EmpresaService {
    private empresaUtil;
    private criptoService;
    constructor(empresaUtil: EmpresautilService, criptoService: CriptoService);
    buscarEmpresa(contratoEmpresa: string, codigoEmpresa: string, codFornecedor: string): Promise<Empresa>;
    buscarFornecedor(contratoEmpresa: string, codigoEmpresa: string, codFornecedor: string): Promise<any>;
}
