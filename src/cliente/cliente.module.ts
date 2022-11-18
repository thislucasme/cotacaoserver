import { Module } from '@nestjs/common';
import { ContratoService } from 'src/contrato/contrato.service';
import { CotacaoService } from 'src/cotacao/cotacao.service';
import { CriptoModule } from 'src/cripto/cripto.module';
import { DatabaseCotacaoService } from 'src/database/database-cotacao.service';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
import { SuccessDatabaseService } from 'src/database/success-database.service';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';

@Module({
    imports: [CriptoModule],
    controllers: [ClienteController,],
    providers: [ClienteService, SiteSuccessDatabaseService, SuccessDatabaseService, DatabaseCotacaoService, CotacaoService, ContratoService],
    exports: [ClienteService]
})
export class ClienteModule { }
