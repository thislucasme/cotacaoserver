import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { FornecedorModule } from 'src/fornecedor/fornecedor.module';
import { FornecedorService } from 'src/fornecedor/fornecedor.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwtStrategy';

@Module({
    imports: [UsuarioModule, PassportModule, forwardRef(() => FornecedorModule), JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60m' },
    })],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtModule]
})
export class AuthModule { }
