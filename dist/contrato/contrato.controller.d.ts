import { ContratoService } from './contrato.service';
export declare class ContratoController {
    private contratoService;
    constructor(contratoService: ContratoService);
    teste(): Promise<{
        servidor: any;
        banco: any;
        usuario: any;
        senha: any;
        porta: any;
    }>;
}
