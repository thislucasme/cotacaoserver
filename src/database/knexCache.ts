import knexFn, { Knex } from 'knex'
import { attachPaginate } from 'knex-paginate'
import { InfoConexao } from 'src/contrato/contrato.dto'

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

    saveKnexInstance(numeroContrato, knex)
  }
  return knex
}
