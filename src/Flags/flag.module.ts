import { FlagController } from './flag.controller';
import { FlagService } from './flag.service';
import { Module } from '@nestjs/common';
import { CotacaoService } from 'src/cotacao/cotacao.service';
import { DatabaseCotacaoService } from 'src/database/database-cotacao.service';
import { CotacaoModule } from 'src/cotacao/cotacao.module';
import { ContratoService } from 'src/contrato/contrato.service';
import { CriptoService } from 'src/cripto/cripto.service';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
import { SuccessDatabaseService } from 'src/database/success-database.service';
import { FlagutilService } from './flagutil.service';

@Module({
    imports: [CotacaoModule],
    controllers: [FlagController],
    providers: [FlagService, FlagutilService, CotacaoService, DatabaseCotacaoService, ContratoService, CriptoService, SiteSuccessDatabaseService, SuccessDatabaseService],
})
export class FlagModule { }
