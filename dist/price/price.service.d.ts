import { Empresa } from 'src/contrato/contrato.dto';
import { CriptoService } from 'src/cripto/cripto.service';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
import { CotacaoTDOPayload } from 'src/models/types';
export declare class PriceService {
    private readonly siteSuccessDatabase;
    private readonly cripto;
    constructor(siteSuccessDatabase: SiteSuccessDatabaseService, cripto: CriptoService);
    getDados(): Promise<any[]>;
    getDadosConexaoCache(contrato: string): Promise<{
        servidor: string;
        banco: string;
        usuario: string;
        senha: string;
        porta: string;
        servidorHex: any;
        bcohex: any;
        dataSincronismo: string;
    }>;
    getConexaoCliente(contrato: string): Promise<import("knex").Knex<any, unknown[]>>;
    getEmpresas(contrato: string, codigoEmpresa: string): Promise<Empresa[]>;
    getItensCotacao(codCotacao: string, codFornecedor: string, contrato: string, codigoEmpresa: string): Promise<any[][]>;
    calcularFrete(cotacaoPayLoad: CotacaoTDOPayload): Promise<any>;
    calcularTotal(cotacaoPayLoad: CotacaoTDOPayload, buscarIds: boolean): Promise<any[]>;
    calcularTotalDesconto(cotacaoPayLoad: CotacaoTDOPayload): Promise<any>;
}
