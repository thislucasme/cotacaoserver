import { Empresa } from 'src/contrato/contrato.dto';
import { CriptoService } from 'src/cripto/cripto.service';
import { DatabaseCotacaoService } from 'src/database/database-cotacao.service';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
import { SuccessDatabaseService } from 'src/database/success-database.service';
export declare class ClienteService {
    private readonly siteSuccessDatabase;
    private readonly cripto;
    private readonly successDatabase;
    private readonly cotacaoServiceDatabase;
    constructor(siteSuccessDatabase: SiteSuccessDatabaseService, cripto: CriptoService, successDatabase: SuccessDatabaseService, cotacaoServiceDatabase: DatabaseCotacaoService);
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
    getEmpresas(contrato: string): Promise<Empresa[]>;
}
