import { TotalService } from './total.service';
import { TotalController } from './total.controller';
import { Module } from '@nestjs/common';
import { CriptoService } from 'src/cripto/cripto.service';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';

@Module({
    imports: [],
    controllers: [TotalController],
    providers: [TotalService, CriptoService, SiteSuccessDatabaseService],
})
export class TotalModule { }
