import { PriceController } from './price.controller';
import { PriceService } from './price.service';

import { Module } from '@nestjs/common';
import { ClienteService } from 'src/cliente/cliente.service';
import { ContratoService } from 'src/contrato/contrato.service';
import { CotacaoService } from 'src/cotacao/cotacao.service';
import { DatabaseCotacaoService } from 'src/database/database-cotacao.service';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
import { SuccessDatabaseService } from 'src/database/success-database.service';
import { CriptoModule } from 'src/cripto/cripto.module';

@Module({
    imports: [CriptoModule],
    controllers: [PriceController],
    providers: [PriceService, ClienteService, SiteSuccessDatabaseService, SuccessDatabaseService, DatabaseCotacaoService, CotacaoService, ContratoService],
})
export class PriceModule {}
