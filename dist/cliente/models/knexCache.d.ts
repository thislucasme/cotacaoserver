import { Knex } from 'knex';
import { InfoConexao } from 'src/contrato/contrato.dto';
export declare const getKnex: (contrato: string) => Knex<any, unknown[]>;
export declare const saveKnexInstance: (contrato: string, instance: Knex) => void;
export declare const getOrCreateKnexInstance: (info: InfoConexao) => Promise<Knex<any, unknown[]>>;
