import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CriptoModule } from 'src/cripto/cripto.module';
import { DatabaseModule } from 'src/database/database.module';
import { ContratoController } from './contrato.controller';
import { ContratoService } from './contrato.service';

@Module({
    imports: [ConfigModule, DatabaseModule, CriptoModule],
    controllers: [ContratoController],
    providers: [ContratoService],
    exports: [ContratoService]
})
export class ContratoModule { }
