import { Module } from '@nestjs/common';
import { ContratoModule } from 'src/contrato/contrato.module';
import { ContratoService } from 'src/contrato/contrato.service';
import { CriptoModule } from 'src/cripto/cripto.module';
import { DatabaseModule } from 'src/database/database.module';
import { EmpresaModule } from 'src/empresa/empresa.module';
import { ObservacaoCotacaoController } from './observacao-cotacao.controller';
import { ObservacaoCotacaoService } from './observacao-cotacao.service';

@Module({
    imports: [ContratoModule,
        EmpresaModule,
        CriptoModule,
        DatabaseModule],
    controllers: [
        ObservacaoCotacaoController,],
    providers: [
        ObservacaoCotacaoService,
        ContratoService],
})
export class ObservacaoCotacaoModule { }
