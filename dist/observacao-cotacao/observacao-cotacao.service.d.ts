import { ConfigService } from '@nestjs/config';
import { ContratoService } from 'src/contrato/contrato.service';
import { CriptoService } from 'src/cripto/cripto.service';
import { EmpresautilService } from 'src/empresa/empresa.util.service';
import { ObservacaoGeralTDO } from 'src/models/types';
export declare class ObservacaoCotacaoService {
    private contratoService;
    private criptoService;
    private empresaUtil;
    private chave;
    constructor(configService: ConfigService, contratoService: ContratoService, criptoService: CriptoService, empresaUtil: EmpresautilService);
    salvarObservacao(observacao: ObservacaoGeralTDO): Promise<void>;
    retornaObservacao(observacao: ObservacaoGeralTDO): Promise<{
        observacao: any;
    }>;
}
