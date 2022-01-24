import { CotacaoController } from './cotacao.controller';
import { CotacaoService } from './cotacao.service';
import { Module } from '@nestjs/common';
import { ContratoService } from 'src/contrato/contrato.service';
import { DatabaseModule } from 'src/database/database.module';
import { CriptoModule } from 'src/cripto/cripto.module';
import { ContratoModule } from 'src/contrato/contrato.module';

@Module({
    imports: [DatabaseModule, CriptoModule, ContratoModule],
    controllers: [CotacaoController,],
    providers: [CotacaoService],
})
export class CotacaoModule { }
