"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContratoService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const knexCache_1 = require("../cliente/models/knexCache");
const cripto_1 = require("../common/cripto");
const cripto_service_1 = require("../cripto/cripto.service");
const database_cotacao_service_1 = require("../database/database-cotacao.service");
const site_success_database_service_1 = require("../database/site-success-database.service");
const success_database_service_1 = require("../database/success-database.service");
let ContratoService = class ContratoService {
    constructor(configService, siteSuccessDatabase, cripto, successDatabase, cotacaoServiceDatabase) {
        this.configService = configService;
        this.siteSuccessDatabase = siteSuccessDatabase;
        this.cripto = cripto;
        this.successDatabase = successDatabase;
        this.cotacaoServiceDatabase = cotacaoServiceDatabase;
        const chave = configService.get('chaveCripto');
        if (!chave) {
            throw new Error('Chave de criptografia não configurada! configurar .env CHAVE_CRIPTO');
        }
    }
    async verificaContrato(numero) {
        const knex = await this.siteSuccessDatabase.getConnection();
        const registro = await knex('da37')
            .select({
            codigo: 'codigo17',
            status: 'status17',
        })
            .where('codigo17', numero)
            .first();
        if (!registro)
            throw new common_1.NotFoundException(`Contrato ${numero} não encontrado!`);
        const status = registro.status;
        if (status === 'B')
            throw new common_1.ForbiddenException(`Contrato ${numero} bloqueado`);
        if (status === 'C')
            throw new common_1.ForbiddenException(`Contrato ${numero} cancelado`);
        if (status === 'S')
            throw new common_1.ForbiddenException(`Contrato ${numero} suspenso`);
        if (status === 'D' || status === 'P')
            return registro;
        else
            throw new common_1.ForbiddenException(`Contrato ${numero} com status desconhecido!`);
    }
    async getContrato(codigo, codigoEmpresa) {
        const knex = this.cotacaoServiceDatabase.getConnection();
        const registro = await knex('da37')
            .leftJoin('da' + codigoEmpresa, 'da37.cliente17', `da${codigoEmpresa}.codigo1`)
            .whereNot('da37.status17', '=', 'C')
            .where('da37.codigo17', '=', codigo)
            .select({
            codigo: 'da37.codigo17',
            status: 'da37.status17',
            cliente: `da${codigoEmpresa}.nome1`,
            cnpj: `da${codigoEmpresa}.cgc1`,
        })
            .first();
        return Object.assign(Object.assign({}, registro), { cnpj: await this.cripto.decriptar(registro.cnpj) });
    }
    async getDadosConexao(contrato) {
        const knex = await this.siteSuccessDatabase.getConnection();
        const registro = await knex('cfgw')
            .select([
            {
                servidor: knex.raw('hex(serbco)'),
                banco: knex.raw('hex(bcodad)'),
                usuario: knex.raw('hex(usebco)'),
                senha: knex.raw('hex( pasbco)'),
                porta: knex.raw('hex(porbco)'),
                dataSincronismo: knex.raw('hex(datsinbco)'),
            },
        ])
            .where('tposer', 'SDC')
            .andWhere(knex.raw('hex(bcodad)'), '=', contrato)
            .andWhere('sr_deleted', '<>', 'T')
            .first();
        const registroRestauradoVazio = {
            servidor: null,
            banco: null,
            usuario: null,
            senha: null,
            porta: null,
        };
        if (!registro)
            return registroRestauradoVazio;
        const registroRestaurado = {
            servidor: (await this.cripto.decriptar(registro.servidor)).trimEnd(),
            banco: (await this.cripto.decriptar(registro.banco)).trimEnd(),
            usuario: (await this.cripto.decriptar(registro.usuario)).trimEnd(),
            senha: (await this.cripto.decriptar(registro.senha)).trimEnd(),
            porta: (await this.cripto.decriptar(registro.porta)).trimEnd(),
            servidorHex: registro.servidor,
            bcohex: registro.banco,
            dataSincronismo: (await this.cripto.decriptar(registro.dataSincronismo)).trimEnd(),
        };
        return registroRestaurado;
    }
    async getDadosConexaoCache(contrato) {
        const knext = await this.siteSuccessDatabase.getConnection();
        const registro = await knext('cfgw')
            .select([
            {
                servidor: knext.raw('hex(serbco)'),
                banco: knext.raw('hex(bcodad)'),
                usuario: knext.raw('hex(usebco)'),
                senha: knext.raw('hex( pasbco)'),
                porta: knext.raw('hex(porbco)'),
                dataSincronismo: knext.raw('hex(datsinbco)'),
            },
        ])
            .where('tposer', 'SDC')
            .andWhere(knext.raw('hex(bcodad)'), '=', contrato)
            .andWhere('sr_deleted', '<>', 'T')
            .first();
        if (!registro)
            return;
        const registroRestaurado = {
            servidor: (await this.cripto.decriptar(registro.servidor)).trimEnd(),
            banco: (await this.cripto.decriptar(registro.banco)).trimEnd(),
            usuario: (await this.cripto.decriptar(registro.usuario)).trimEnd(),
            senha: (await this.cripto.decriptar(registro.senha)).trimEnd(),
            porta: (await this.cripto.decriptar(registro.porta)).trimEnd(),
            servidorHex: registro.servidor,
            bcohex: registro.banco,
            dataSincronismo: (await this.cripto.decriptar(registro.dataSincronismo)).trimEnd(),
        };
        return registroRestaurado;
    }
    async getConexaoCliente(contrato) {
        const dadosConexao = await this.getDadosConexaoCache(contrato);
        if (!dadosConexao)
            throw new common_1.NotFoundException('Dados de conexão com o banco de dados do cliente não encontrados!');
        const knex = await (0, knexCache_1.getOrCreateKnexInstance)(dadosConexao);
        return knex;
    }
    async getEmpresas(contrato, codigoEmpresa) {
        const knex = await this.getConexaoCliente(contrato);
        const empresas = await knex('pe' + codigoEmpresa).select([
            'codigo',
            'razao',
            'empresa',
            'cgc',
        ]);
        const parsedEmpresas = empresas.map(empresa => ({
            codigo: empresa.codigo,
            razao: (0, cripto_1.restaurar)(empresa.razao),
            empresa: (0, cripto_1.restaurar)(empresa.empresa),
            cnpj: empresa.cgc,
            cidade: empresa.cidade
        }));
        return parsedEmpresas;
    }
    async getConexaoClienteCache(contrato) {
        const { codigo } = await this.verificaContrato(contrato);
        const dadosConexao = await this.getDadosConexao(codigo);
        if (!dadosConexao)
            throw new common_1.NotFoundException('Dados de conexão com o banco de dados do cliente não encontrados!');
        const knex = await (0, knexCache_1.getOrCreateKnexInstance)(dadosConexao);
        return knex;
    }
};
ContratoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        site_success_database_service_1.SiteSuccessDatabaseService,
        cripto_service_1.CriptoService,
        success_database_service_1.SuccessDatabaseService,
        database_cotacao_service_1.DatabaseCotacaoService])
], ContratoService);
exports.ContratoService = ContratoService;
//# sourceMappingURL=contrato.service.js.map