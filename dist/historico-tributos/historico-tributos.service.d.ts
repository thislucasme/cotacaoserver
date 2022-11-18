import { ContratoService } from 'src/contrato/contrato.service';
import { CriptoService } from 'src/cripto/cripto.service';
import { HistoricoProdutosParametro } from 'src/models/types';
export declare class HistoricoTributosService {
    private contratoService;
    private criptoService;
    constructor(contratoService: ContratoService, criptoService: CriptoService);
    buscarHistoricoBy(body: HistoricoProdutosParametro): Promise<any>;
}
