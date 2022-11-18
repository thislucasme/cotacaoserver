import { HistoricoProdutosParametro } from 'src/models/types';
import { HistoricoTributosService } from './historico-tributos.service';
import { Response } from 'express';
export declare class HistoricoTributosController {
    private historicoTributos;
    constructor(historicoTributos: HistoricoTributosService);
    buscarHistoricoDeProdutoBy(body: HistoricoProdutosParametro, res: Response): Promise<void>;
}
