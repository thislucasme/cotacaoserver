import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginTDO } from 'src/models/types';
import { LoginTdo } from 'src/usuario/interfaces/login.tdo';
import { FornecedorService } from './fornecedor.service';
export declare class FornecedorController {
    private fornecedorService;
    private authService;
    constructor(fornecedorService: FornecedorService, authService: AuthService);
    findFornecedorByEmail(body: LoginTDO, res: Response): Promise<Response<any, Record<string, any>>>;
    findFornecedorByEmailNaTabelaCredencial(body: LoginTDO): Promise<import("src/models/types").FornecedorCredencials>;
    login(body: LoginTdo): Promise<{
        access_token: string;
    }>;
    teste(body: LoginTDO): Promise<import("src/models/types").Fornecedor>;
}
