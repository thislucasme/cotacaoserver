import { CriptoService } from 'src/cripto/cripto.service';
import { SiteSuccessDatabaseService } from './site-success-database.service';
export declare class ConnectionService {
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
}
