import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knexFn, { Knex } from 'knex';

@Injectable()
export class SuccessDatabaseService {
	private knex: Knex;

	constructor(configService: ConfigService) {
		const host = configService.get('success.host');
		if (!host)
			throw new Error('VARIAVEL DE AMBIENTE SUCCESS_DB_HOST NÃO CONFIGURADA!')
		const port = configService.get('success.port')
		if (!port)
			throw new Error('VARIAVEL DE AMBIENTE SUCCESS_DB_PORT NÃO CONFIGURADA!')
		const user = configService.get('success.user')
		if (!user)
			throw new Error('VARIAVEL DE AMBIENTE SUCCESS_DB_USER NÃO CONFIGURADA!')
		const password = configService.get('success.password')
		if (!password)
			throw new Error(
				'VARIAVEL DE AMBIENTE SUCCESS_DB_PASSWORD NÃO CONFIGURADA!'
			)
		const database = configService.get('success.name')
		if (!database)
			throw new Error('VARIAVEL DE AMBIENTE SUCCESS_DB_NAME NÃO CONFIGURADA!')

		this.knex = knexFn({
			client: 'mysql2',
			connection: {
				host,
				port,
				user,
				password,
				database,
			},
			pool: {
				max: 10,
				acquireTimeoutMillis: 30000,
			  },
		})
	}

	getConnection() {
		return this.knex
	}
}

