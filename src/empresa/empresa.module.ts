import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ContratoModule } from 'src/contrato/contrato.module';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
import { CriptoService } from 'src/cripto/cripto.service';
import { EmpresautilService } from './empresa.util.service';

@Module({
    imports: [ContratoModule],
    controllers: [EmpresaController],
    providers: [EmpresaService, SiteSuccessDatabaseService, CriptoService, EmpresautilService],
})
export class EmpresaModule { }
