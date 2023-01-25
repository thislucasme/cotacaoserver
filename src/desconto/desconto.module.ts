import { DescontoController } from './desconto.controller';
import { DescontoService } from './desconto.service';
import { Module } from '@nestjs/common';
import { CriptoModule } from 'src/cripto/cripto.module';
import { ContratoService } from 'src/contrato/contrato.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
import { SuccessDatabaseService } from 'src/database/success-database.service';
import { DatabaseCotacaoService } from 'src/database/database-cotacao.service';
import { CotacaoService } from 'src/cotacao/cotacao.service';
import { PriceService } from 'src/price/price.service';
import { UtilService } from './util.service';
import { CompartilhadaModule } from 'src/compartilhada/compartilhada.module';
import { CompartilhadaService } from 'src/compartilhada/compartilhada.service';

@Module({
    imports: [CriptoModule, CompartilhadaModule],
    controllers: [DescontoController],
    providers: [CompartilhadaService,UtilService, DescontoService, PriceService, ClienteService, SiteSuccessDatabaseService, SuccessDatabaseService, DatabaseCotacaoService, CotacaoService, ContratoService],
})
export class DescontoModule { }
