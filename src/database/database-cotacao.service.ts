import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knexfn, { Knex } from 'knex';

@Injectable()
export class DatabaseCotacaoService {
	private knex: Knex;
	constructor(configService: ConfigService) {
		const host = configService.get('databaseTeste.host');
		if (!host) {
			throw new Error('VARIÁVEL DE AMBIENTE DATABASE_HOST_TESTE NÃO FOI CONFIGURADA')
		}
		const port = configService.get('databaseTeste.port');
		if (!port) {
			throw new Error('VARIÁVEL DE AMBIENTE DATABASE_PORT_TESTE NÃO FOI CONFIGURADA')
		}
		const user = configService.get('databaseTeste.user');
		if (!user) {
			throw new Error('VARIÁVEL DE AMBIENTE DATABASE_USER_TESTE NÃO FOI CONFIGURADA')
		}
		const password = configService.get('databaseTeste.password');
		if (!password) {
			throw new Error('VARIÁVEL DE AMBIENTE DATABASE_PASSWORD_TESTE NÃO FOI CONFIGURADA')
		}
		const database = configService.get('databaseTeste.name');
		if (!database) {
			throw new Error('VARIÁVEL DE AMBIENTE DATABASE_NAME_TESTE NÃO FOI CONFIGURADA')
		}
		this.knex = knexfn({
			client: 'mysql2',
			connection: {
				host: host,
				port: port,
				user: user,
				password: password,
				database: database
			}
		})
	}
	getConnection() {
		return this.knex;
	}
}
