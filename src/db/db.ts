import knexfn, { Knex } from 'knex';

export const knex = knexfn({
	client: 'mysql2',
	connection: {
		host: "192.168.254.70",
		port: 3306,
		user: "root",
		password: "1234",
		database: "api"
	},
	pool: {
		max: 10,
		acquireTimeoutMillis: 30000,
	  },
})