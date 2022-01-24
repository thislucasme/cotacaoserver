export default () => ({
	chaveCripto: process.env.CHAVE_CRIPTO,
	databaseTeste: {
		host: process.env.DATABASE_HOST_TESTE,
		port: parseInt(process.env.DATABASE_PORT_TESTE ?? '3306', 10),
		user: process.env.DATABASE_USER_TESTE,
		password: process.env.DATABASE_PASSWORD_TESTE,
		name: process.env.DATABASE_NAME_TESTE,
	},
	database: {
		host: process.env.DATABASE_HOST,
		port: parseInt(process.env.DATABASE_PORT ?? '3306', 10),
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		name: process.env.DATABASE_NAME,
	},
	success: {
		host: process.env.SUCCESS_DB_HOST,
		port: parseInt(process.env.SUCCESS_DB_PORT ?? '3306', 10),
		user: process.env.SUCCESS_DB_USER,
		password: process.env.SUCCESS_DB_PASSWORD,
		name: process.env.SUCCESS_DB_NAME,
	},
	siteSuccess: {
		host: process.env.SITE_SUCCESS_DB_HOST,
		port: parseInt(process.env.SITE_SUCCESS_DB_PORT ?? '3306', 10),
		user: process.env.SITE_SUCCESS_DB_USER,
		password: process.env.SITE_SUCCESS_DB_PASSWORD,
		name: process.env.SITE_SUCCESS_DB_NAME,
	},
	fornecedor: {
		host: process.env.FORNECEDOR_HOST,
		port: parseInt(process.env.FORNECEDOR_PORT ?? '3306', 10),
		user: process.env.FORNECEDOR_USER,
		password: process.env.FORNECEDOR_PASSWORD,
		name: process.env.FORNECEDOR_NAME,
	}
})