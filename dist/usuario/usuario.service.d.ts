import { ApiDatabaseService } from 'src/database/api-database.service';
export declare class Usuario {
    nome: string;
    email: string;
    id: number;
    senha: string;
}
export declare class UsuarioService {
    private databaseService;
    constructor(databaseService: ApiDatabaseService);
    private credentials;
    findUserById(id: number): Promise<Usuario | null>;
    findUserByEmail(email: string): Promise<Usuario | null>;
    teste(): Promise<any[]>;
}
