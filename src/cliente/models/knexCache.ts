import knexFn, { Knex } from 'knex'
import { attachPaginate } from 'knex-paginate'
import { InfoConexao } from 'src/contrato/contrato.dto'

/*
Esse projeto se comunica com vários bancos de dados, cada cliente possui um banco de dados próprio.

Imagine que o contador fez login e está acessando os documentos de um cliente/empresa. Será feita uma requisição a API para buscar esses documentos.

Quando essa requisição chega, através do JWT nós pegamos o número do contrato do cliente, com o número do contrato nós sabemos em qual banco
devemos conectar.
Através do Knex nós conectamos ao banco, buscamos a informação e retornamos os dados. 
O único problema é que teríamos que criar uma nova conexão a cada requisição.

Esse arquivo define um Map onde cada nova conexão é guardada nele indexada pelo numero do contrato do cliente.
Quando chega uma requisição que necessita consultar o banco de dados de algum cliente o sistema verifica antes se já existe essa conexão no Map e retorna ela.


*/

const knexCache = new Map<string, Knex>()

export const getKnex = (contrato: string) => {
	// console.log(knexCache.keys())
	return knexCache.get(contrato)
}

export const saveKnexInstance = (contrato: string, instance: Knex) => {
	// console.log(`set Knex ${contrato}`)
	knexCache.set(contrato, instance)
}

export const getOrCreateKnexInstance = async (info: InfoConexao) => {
	const numeroContrato = info.banco
	let knex = getKnex(numeroContrato)
	if (!knex) {
		knex = knexFn({
			client: 'mysql2',
			connection: {
				database: info.banco,
				host: info.servidor,
				port: parseInt(info.porta || '3306', 10),
				user: info.usuario,
				password: info.senha,
				charset: 'latin1',
			},
		})
		if (!knex.queryBuilder().paginate) {
			attachPaginate()
		}
	}
	return knex
}
