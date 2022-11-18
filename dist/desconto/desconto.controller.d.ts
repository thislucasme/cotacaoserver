import { Response } from 'express';
import { DescontoTDO } from 'src/models/types';
import { DescontoService } from './desconto.service';
export declare class DescontoController {
    private descontoService;
    constructor(descontoService: DescontoService);
    adcionarDesconto(body: DescontoTDO, res: Response): Promise<void>;
    descontoDev(body: DescontoTDO, res: Response): Promise<void>;
    desconto(body: any): Promise<void>;
    relatorio(body: any): Promise<{
        ok: number;
    }>;
}
