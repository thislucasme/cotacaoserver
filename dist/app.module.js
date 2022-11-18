"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const observacao_cotacao_module_1 = require("./observacao-cotacao/observacao-cotacao.module");
const cotacaoinfo_module_1 = require("./cotacaoinfo/cotacaoinfo.module");
const desconto_module_1 = require("./desconto/desconto.module");
const user_module_1 = require("./user/user.module");
const banco_module_1 = require("./banco/banco.module");
const total_module_1 = require("./total/total.module");
const price_module_1 = require("./price/price.module");
const empresa_module_1 = require("./empresa/empresa.module");
const historico_tributos_module_1 = require("./historico-tributos/historico-tributos.module");
const cotacao_module_1 = require("./cotacao/cotacao.module");
const contrato_module_1 = require("./contrato/contrato.module");
const fornecedor_module_1 = require("./fornecedor/fornecedor.module");
const cliente_module_1 = require("./cliente/cliente.module");
const database_module_1 = require("./database/database.module");
const common_1 = require("@nestjs/common");
const usuario_module_1 = require("./usuario/usuario.module");
const config_1 = require("@nestjs/config");
const configuracao_1 = require("./config/configuracao");
const cripto_module_1 = require("./cripto/cripto.module");
const auth_module_1 = require("./auth/auth.module");
const mailer_1 = require("@nestjs-modules/mailer");
const flag_module_1 = require("./Flags/flag.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            observacao_cotacao_module_1.ObservacaoCotacaoModule,
            cotacaoinfo_module_1.CotacaoinfoModule,
            desconto_module_1.DescontoModule,
            user_module_1.UserModule,
            banco_module_1.BancoModule,
            total_module_1.TotalModule,
            price_module_1.PriceModule,
            cotacao_module_1.CotacaoModule,
            empresa_module_1.EmpresaModule,
            historico_tributos_module_1.HistoricoTributosModule,
            cotacao_module_1.CotacaoModule,
            flag_module_1.FlagModule,
            contrato_module_1.ContratoModule,
            fornecedor_module_1.FornecedorModule,
            auth_module_1.AuthModule,
            mailer_1.MailerModule.forRootAsync({
                useFactory: async () => {
                    return {
                        transport: {
                            host: 'mail.success.inf.br',
                            port: 587,
                            secure: false,
                            auth: {
                                user: 'automatico@success.inf.br',
                                pass: 'gersuc1987',
                            },
                            ignoreTLS: true,
                        },
                        preview: true,
                    };
                },
            }),
            cliente_module_1.ClienteModule, cripto_module_1.CriptoModule, usuario_module_1.UsuarioModule, database_module_1.DatabaseModule, config_1.ConfigModule.forRoot({
                load: [configuracao_1.default],
                isGlobal: true
            })
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map