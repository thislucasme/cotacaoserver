import { CotacaoController } from './cotacao.controller';
import { CotacaoService } from './cotacao.service';
import { Module } from '@nestjs/common';
import { ContratoService } from 'src/contrato/contrato.service';
import { DatabaseModule } from 'src/database/database.module';
import { CriptoModule } from 'src/cripto/cripto.module';
import { ContratoModule } from 'src/contrato/contrato.module';
import { CompartilhadaModule } from 'src/compartilhada/compartilhada.module';
import { CompartilhadaService } from 'src/compartilhada/compartilhada.service';

@Module({
    imports: [DatabaseModule, CriptoModule, ContratoModule, CompartilhadaModule],
    controllers: [CotacaoController,],
    providers: [CotacaoService, CompartilhadaService],
})
export class CotacaoModule { }
