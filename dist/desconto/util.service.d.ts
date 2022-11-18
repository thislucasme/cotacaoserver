import { DescontoTDO, GeneratedData, GenerateIdDataByArray } from 'src/models/types';
import { PriceService } from 'src/price/price.service';
export declare class UtilService {
    private priceService;
    constructor(priceService: PriceService);
    generateIdDataByArray(ids: any): Promise<GenerateIdDataByArray> | null;
    generateArrayOfValuesDesconto(descontoTDO: DescontoTDO, totalItens: any): Promise<{
        array: number[];
        soma: number;
        first: number;
        last: number;
    }>;
    generateArrayOfValues(descontoTDO: DescontoTDO, totalItens: any): Promise<GeneratedData> | null;
    calcularTotalItens(dados: any[]): Promise<number>;
    calcularDiff(descontoTDO: DescontoTDO, itens: any[]): Promise<GeneratedData> | null;
}
