import { CompartilhadaController } from './compartilhada.controller';
import { CompartilhadaService } from './compartilhada.service';
import { Module } from '@nestjs/common';
import { ContratoModule } from 'src/contrato/contrato.module';
import { CriptoModule } from 'src/cripto/cripto.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, CriptoModule, ContratoModule, CriptoModule],
    controllers: [
        CompartilhadaController,],
    providers: [
        CompartilhadaService,],
})
export class CompartilhadaModule { }
