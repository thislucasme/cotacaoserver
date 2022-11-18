import { ObservacaoCotacaoModule } from './observacao-cotacao/observacao-cotacao.module';
import { CotacaoinfoModule } from './cotacaoinfo/cotacaoinfo.module';
import { DescontoModule } from './desconto/desconto.module';
import { UserModule } from './user/user.module';
import { BancoModule } from './banco/banco.module';
import { TotalModule } from './total/total.module';
import { PriceModule } from './price/price.module';
import { EmpresaModule } from './empresa/empresa.module';
import { HistoricoTributosModule } from './historico-tributos/historico-tributos.module';
import { CotacaoModule } from './cotacao/cotacao.module';
import { ContratoModule } from './contrato/contrato.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { ClienteModule } from './cliente/cliente.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import configuracao from 'src/config/configuracao';
import { CriptoModule } from 'src/cripto/cripto.module';
import { AuthModule } from 'src/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { FlagModule } from './Flags/flag.module';

@Module({
  imports: [
    ObservacaoCotacaoModule,
    CotacaoinfoModule,
    DescontoModule,
    UserModule,
    BancoModule,
    TotalModule,
    PriceModule,
    CotacaoModule,
    EmpresaModule,
    HistoricoTributosModule,
    CotacaoModule,
    FlagModule,
    ContratoModule,
    FornecedorModule,
    AuthModule,
    MailerModule.forRootAsync({
      useFactory: async () => {
        return {
          transport: {
            host: 'mail.success.inf.br',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'automatico@success.inf.br',
              pass: 'gersuc1987', // generated ethereal password
            },
            ignoreTLS: true,
          },
          preview: true,
        }
      },
    }),
    ClienteModule, CriptoModule, UsuarioModule, DatabaseModule, ConfigModule.forRoot({
      load: [configuracao],
      isGlobal: true
    })]
})
//
export class AppModule { }
