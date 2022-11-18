import { ObservacaoGeralTDO } from 'src/models/types';
import { ObservacaoCotacaoService } from './observacao-cotacao.service';
export declare class ObservacaoCotacaoController {
    private observacaoService;
    constructor(observacaoService: ObservacaoCotacaoService);
    criarObservacao(body: ObservacaoGeralTDO): Promise<void>;
    getObservacao(body: ObservacaoGeralTDO): Promise<{
        observacao: any;
    }>;
}
