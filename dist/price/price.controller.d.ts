import { ClienteService } from 'src/cliente/cliente.service';
import { CotacaoService } from 'src/cotacao/cotacao.service';
import * as types from 'src/models/types';
import { CotacaoTDOPayload } from 'src/models/types';
import { PriceService } from './price.service';
export declare class PriceController {
    private clienteService;
    private cotacaoService;
    private priceService;
    constructor(clienteService: ClienteService, cotacaoService: CotacaoService, priceService: PriceService);
    getAllItensFromCotacao(codCotacao: string, codFornecedor: string, codEmpresa: string, codContrato: string): Promise<any[]>;
    updateItemCotacao(body: types.ItemCotacaoTDO): Promise<{
        status: import("@nestjs/common").HttpStatus;
        msg: string;
    } | {
        error: any;
    }>;
    readToSend(body: CotacaoTDOPayload): Promise<void | {
        error: any;
    }>;
}
