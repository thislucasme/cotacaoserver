import { ApiDatabaseService } from './api-database.service';
import { Module } from '@nestjs/common';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
import { SuccessDatabaseService } from 'src/database/success-database.service';
import { FornecedorDatabaseService } from './fornecedor-database.service';
import { DatabaseCotacaoService } from './database-cotacao.service';

@Module({
    providers: [
        ApiDatabaseService, DatabaseCotacaoService,
        SiteSuccessDatabaseService, SuccessDatabaseService,
        FornecedorDatabaseService
    ],
    exports: [
        ApiDatabaseService, DatabaseCotacaoService,
        SiteSuccessDatabaseService, SuccessDatabaseService,
        FornecedorDatabaseService
    ]
})
export class DatabaseModule { }
