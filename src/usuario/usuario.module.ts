import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsuarioController } from 'src/usuario/usuario.controller';
import { UsuarioService } from 'src/usuario/usuario.service';


@Module({
    controllers: [UsuarioController],
    providers: [UsuarioService, DatabaseModule],
    imports: [DatabaseModule],
    exports: [UsuarioService],
})
export class UsuarioModule { }
