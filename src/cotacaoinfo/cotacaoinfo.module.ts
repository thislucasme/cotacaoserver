import { CotacaoinfoController } from './cotacaoinfo.controller';
import { CotacaoinfoService } from './cotacaoinfo.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ConnectionService } from 'src/database/connection.service';
import { CriptoService } from 'src/cripto/cripto.service';

@Module({
    imports: [DatabaseModule],
    controllers: [CotacaoinfoController,],
    providers: [
        CotacaoinfoService, ConnectionService, CriptoService],
})
export class CotacaoinfoModule { }
