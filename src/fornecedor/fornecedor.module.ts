import { FornecedorController } from './fornecedor.controller';
import { FornecedorService } from './fornecedor.service';
import { Module } from '@nestjs/common';
import { FornecedorDatabaseService } from 'src/database/fornecedor-database.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [FornecedorController],
    providers: [FornecedorService, FornecedorDatabaseService],
    exports: [FornecedorService]
})
export class FornecedorModule { }
