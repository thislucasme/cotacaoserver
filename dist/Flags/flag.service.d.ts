import { ContratoService } from 'src/contrato/contrato.service';
import { CriptoService } from 'src/cripto/cripto.service';
import { CotacaoTDOPayload } from 'src/models/types';
import { FlagutilService } from './flagutil.service';
export declare class FlagService {
    private contratoService;
    private flagServiceUtil;
    private criptoService;
    constructor(contratoService: ContratoService, flagServiceUtil: FlagutilService, criptoService: CriptoService);
    consultarFlags(cotacaoPayload: CotacaoTDOPayload): Promise<any>;
    finalizarCotacao(cotacaoTDOPayload: CotacaoTDOPayload): Promise<any>;
}
