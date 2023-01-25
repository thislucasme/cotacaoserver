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
import { CompartilhadaModule } from 'src/compartilhada/compartilhada.module';
import { CompartilhadaService } from 'src/compartilhada/compartilhada.service';

@Module({
    imports: [CotacaoModule, CompartilhadaModule],
    controllers: [FlagController],
    providers: [CompartilhadaService, FlagService, FlagutilService, CotacaoService, DatabaseCotacaoService, ContratoService, CriptoService, SiteSuccessDatabaseService, SuccessDatabaseService],
})
export class FlagModule { }
