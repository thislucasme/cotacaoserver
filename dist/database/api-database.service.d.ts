import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';
export declare class ApiDatabaseService {
    private knex;
    constructor(configService: ConfigService);
    getConnection(): Knex<any, unknown[]>;
}
