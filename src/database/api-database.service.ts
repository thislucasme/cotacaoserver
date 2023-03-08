import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knexfn, { Knex } from 'knex';

@Injectable()
export class ApiDatabaseService {
	private knex: Knex;
	constructor(configService: ConfigService) {
		const host = configService.get('database.host');
		if (!host) {
			throw new Error('VARIÁVEL DE AMBIENTE DATABASE_HOST NÃO FOI CONFIGURADA')
		}
		const port = configService.get('database.port');
		if (!port) {
			throw new Error('VARIÁVEL DE AMBIENTE DATABASE_PORT NÃO FOI CONFIGURADA')
		}
		const user = configService.get('database.user');
		if (!user) {
			throw new Error('VARIÁVEL DE AMBIENTE DATABASE_USER NÃO FOI CONFIGURADA')
		}
		const password = configService.get('database.password');
		if (!password) {
			throw new Error('VARIÁVEL DE AMBIENTE DATABASE_PASSWORD NÃO FOI CONFIGURADA')
		}
		const database = configService.get('database.name');


		if (!database) {
			throw new Error('VARIÁVEL DE AMBIENTE DATABASE_NAME NÃO FOI CONFIGURADA')
		}
		this.knex = knexfn({
			client: 'mysql2',
			connection: {
				host: host,
				port: port,
				user: user,
				password: password,
				database: database
			},
			pool: {
				max: 10,
				acquireTimeoutMillis: 30000,
			  },
		})
	}
	getConnection() {
		return this.knex;
	}
}
