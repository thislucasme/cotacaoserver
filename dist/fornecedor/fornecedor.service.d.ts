import { FornecedorDatabaseService } from 'src/database/fornecedor-database.service';
import { Fornecedor, FornecedorCredencials } from 'src/models/types';
export declare class FornecedorService {
    private databaseFornecedor;
    constructor(databaseFornecedor: FornecedorDatabaseService);
    findFornecedorByEmail(email: string): Promise<Fornecedor | null>;
    findFornecedorByEmailCredencials(email: string): Promise<FornecedorCredencials | null>;
    findFornecedorByEmailCredencialsTeste(email: string): Promise<FornecedorCredencials | null>;
}
