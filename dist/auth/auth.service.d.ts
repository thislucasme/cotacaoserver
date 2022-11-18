import { JwtService } from '@nestjs/jwt';
import { FornecedorService } from 'src/fornecedor/fornecedor.service';
import { UsuarioTDO } from 'src/usuario/usuarioDTO';
export declare class AuthService {
    private fornecedorService;
    private jwtService;
    constructor(fornecedorService: FornecedorService, jwtService: JwtService);
    validateUsuario(email: string, senha: string): Promise<Partial<UsuarioTDO>>;
    login(usuario: Partial<UsuarioTDO>): Promise<{
        access_token: string;
    }>;
}
