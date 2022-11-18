import { Strategy } from "passport-jwt";
import { Payload } from "src/usuario/interfaces/payload.validate";
import { UsuarioService } from "src/usuario/usuario.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usuarioService;
    constructor(usuarioService: UsuarioService);
    validate(payload: Payload): Promise<{
        senha: any;
        nome: string;
        email: string;
        id: number;
    }>;
}
export {};
