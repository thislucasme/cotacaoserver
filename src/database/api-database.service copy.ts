import { Injectable } from '@nestjs/common';
import knexfn, { Knex } from 'knex';

@Injectable()
export class DatabaseService {
	private knex: Knex;
	constructor() {

		this.knex = knexfn({
			client: 'mysql2',
			connection: {
				host: "localhost",
				port: 123,
				user: "usuario",
				password: "gemmanjdj",
				database: "sdsd"
			}
		})
	}
	getConnection() {
		return this.knex;
	}
}
