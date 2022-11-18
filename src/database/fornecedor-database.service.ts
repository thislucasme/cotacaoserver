import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knexFn, { Knex } from 'knex';

@Injectable()
export class FornecedorDatabaseService {
	private knex: Knex;

	constructor(configService: ConfigService) {
		const host = configService.get('fornecedor.host');
		if (!host) {
			throw new Error(
				'Variável de ambiente FORNECEDOR_HOST não configurada!'
			)
		}
		const port = configService.get('fornecedor.port')
		if (!port)
			throw new Error(
				'VARIAVEL DE AMBIENTE FORNECEDOR_PORT NÃO CONFIGURADA!'
			)
		const user = configService.get('fornecedor.user')
		if (!user)
			throw new Error(
				'VARIAVEL DE AMBIENTE FORNECEDOR_USER NÃO CONFIGURADA!'
			)
		const password = configService.get('fornecedor.password')
		if (!password)
			throw new Error(
				'VARIAVEL DE AMBIENTE FORNECEDOR_PASSWORD NÃO CONFIGURADA!'
			)
		const database = configService.get('fornecedor.name')
		if (!database)
			throw new Error(
				'VARIAVEL DE AMBIENTE FORNECEDOR_NAME NÃO CONFIGURADA!'
			)

		this.knex = knexFn({
			client: 'mysql2',
			connection: {
				host,
				port,
				user,
				password,
				database,
			},
		})
	}

	getConnection() {
		return this.knex;
	}

}
