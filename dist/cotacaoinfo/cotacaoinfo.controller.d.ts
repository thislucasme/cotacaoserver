import { CotacaoinfoService } from './cotacaoinfo.service';
export declare class CotacaoinfoController {
    private cotacaoInfoService;
    constructor(cotacaoInfoService: CotacaoinfoService);
    get(body: any): Promise<any>;
}
