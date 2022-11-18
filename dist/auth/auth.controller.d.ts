import { LoginTdo } from 'src/usuario/interfaces/login.tdo';
import { UsuarioTDO } from 'src/usuario/usuarioDTO';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: LoginTdo): Promise<{
        access_token: string;
    }>;
    usuarioAtual(usuario: UsuarioTDO): Promise<UsuarioTDO>;
    teste(): Promise<any>;
    testeTransaction(): Promise<void>;
}
