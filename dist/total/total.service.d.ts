import { Empresa } from 'src/contrato/contrato.dto';
import { CriptoService } from 'src/cripto/cripto.service';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
export declare class TotalService {
    private cripto;
    private siteSuccessDatabase;
    constructor(cripto: CriptoService, siteSuccessDatabase: SiteSuccessDatabaseService);
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
}
