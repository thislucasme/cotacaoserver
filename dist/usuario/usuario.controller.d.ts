import { ApiDatabaseService } from 'src/database/api-database.service';
import { UsuarioService } from 'src/usuario/usuario.service';
export declare class UsuarioController {
    private usuarioService;
    private databaseService;
    constructor(usuarioService: UsuarioService, databaseService: ApiDatabaseService);
    teste(): Promise<any[]>;
}
