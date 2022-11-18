import { HttpStatus } from '@nestjs/common';
import { Empresa } from 'src/contrato/contrato.dto';
import { CriptoService } from 'src/cripto/cripto.service';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
import { DescontoTDO } from 'src/models/types';
import { PriceService } from 'src/price/price.service';
import { UtilService } from './util.service';
export declare class DescontoService {
    private readonly siteSuccessDatabase;
    private readonly cripto;
    private priceService;
    private utilService;
    constructor(siteSuccessDatabase: SiteSuccessDatabaseService, cripto: CriptoService, priceService: PriceService, utilService: UtilService);
    gerar: () => {
        ok: number;
    };
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
    adicionarDescontoDev(descontoTDO: DescontoTDO): Promise<{
        statusCode: number;
        message: string;
    } | {
        statusCode: HttpStatus;
        message: string;
    }>;
    teste(body: any): Promise<void>;
    adicionarDesconto(descontoTDO: DescontoTDO): Promise<{
        statusCode: HttpStatus;
        message: string;
        success: boolean;
    }>;
    ajustarDesconto(): void;
}
