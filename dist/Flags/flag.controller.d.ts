import { CotacaoTDOPayload } from 'src/models/types';
import { Response } from 'express';
import { FlagService } from './flag.service';
export declare class FlagController {
    private flagService;
    constructor(flagService: FlagService);
    verificarFlags(body: CotacaoTDOPayload, res: Response): Promise<void>;
    finalizarCotacao(body: CotacaoTDOPayload, res: Response): Promise<any>;
}
