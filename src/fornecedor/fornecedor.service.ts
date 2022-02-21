import { Injectable } from '@nestjs/common';
import { FornecedorDatabaseService } from 'src/database/fornecedor-database.service';
import { Fornecedor, FornecedorCredencials } from 'src/models/types';

@Injectable()
export class FornecedorService {

	constructor(private databaseFornecedor: FornecedorDatabaseService) { }

	async findFornecedorByEmail(email: string): Promise<Fornecedor | null> {
		const knex = this.databaseFornecedor.getConnection();
		const fornecedor = await knex('fornecedores').select().where('email', email).first();
		return fornecedor;
	}

	async findFornecedorByEmailCredencials(email: string): Promise<FornecedorCredencials | null> {
		const knex = this.databaseFornecedor.getConnection();
		const credenciais = await knex('fornecedorescredencials').select().where('email', email).first();
		return credenciais;
	}
	async findFornecedorByEmailCredencialsTeste(email: string): Promise<FornecedorCredencials | null> {
		return { email: "lucas@gmail.com", senha: "1234" };
	}
}
