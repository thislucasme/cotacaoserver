import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';
import { CriptoService } from 'src/cripto/cripto.service';
import { DatabaseCotacaoService } from 'src/database/database-cotacao.service';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
import { SuccessDatabaseService } from 'src/database/success-database.service';
import { Empresa } from './contrato.dto';
export declare class ContratoService {
    private readonly configService;
    private readonly siteSuccessDatabase;
    private readonly cripto;
    private readonly successDatabase;
    private readonly cotacaoServiceDatabase;
    constructor(configService: ConfigService, siteSuccessDatabase: SiteSuccessDatabaseService, cripto: CriptoService, successDatabase: SuccessDatabaseService, cotacaoServiceDatabase: DatabaseCotacaoService);
    verificaContrato(numero: string): Promise<{
        codigo: string;
        status: string;
    }>;
    getContrato(codigo: string, codigoEmpresa: string): Promise<{
        cnpj: string;
        codigo: any;
        status: any;
        cliente: any;
    }>;
    getDadosConexao(contrato: string): Promise<{
        servidor: any;
        banco: any;
        usuario: any;
        senha: any;
        porta: any;
    }>;
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
    getConexaoCliente(contrato: string): Promise<Knex<any, unknown[]>>;
    getEmpresas(contrato: string, codigoEmpresa: string): Promise<Empresa[]>;
    getConexaoClienteCache(contrato: string): Promise<Knex<any, unknown[]>>;
}
