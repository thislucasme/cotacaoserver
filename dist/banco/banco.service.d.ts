import { Knex } from 'knex';
export declare class BancoService {
    private knex;
    constructor();
    getConnection(): Knex<any, unknown[]>;
}
