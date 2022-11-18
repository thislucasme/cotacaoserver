import { HistoricoTributosController } from './historico-tributos.controller';
import { HistoricoTributosService } from './historico-tributos.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ContratoModule } from 'src/contrato/contrato.module';
import { CriptoModule } from 'src/cripto/cripto.module';

@Module({
    imports: [DatabaseModule, ContratoModule, CriptoModule],
    controllers: [
        HistoricoTributosController,],
    providers: [
        HistoricoTributosService,],
    exports: [HistoricoTributosService]
})
export class HistoricoTributosModule { }
