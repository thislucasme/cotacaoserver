import { ClienteService } from 'src/cliente/cliente.service';
import { CotacaoService } from 'src/cotacao/cotacao.service';
export declare class ClienteController {
    private clienteService;
    private cotacaoService;
    constructor(clienteService: ClienteService, cotacaoService: CotacaoService);
    teste(): Promise<void>;
}
