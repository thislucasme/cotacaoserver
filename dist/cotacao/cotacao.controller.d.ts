import { Response } from 'express';
import { CotacaoService } from './cotacao.service';
import * as moment from 'moment';
export declare class CotacaoController {
    private cotacaoService;
    constructor(cotacaoService: CotacaoService);
    enviar(): Promise<any>;
    receber(dadosSuccess: any, res: Response): Promise<void>;
    converter(body: any): Promise<string>;
    getData(body: any): Promise<{
        vencimento: moment.Moment;
        isVencido: boolean;
        msg?: undefined;
    } | {
        msg: string;
        vencimento?: undefined;
        isVencido?: undefined;
    }>;
    isVencido(vencimento: moment.Moment): boolean;
}
