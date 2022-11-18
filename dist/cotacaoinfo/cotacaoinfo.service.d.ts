import { Knex } from 'knex';
import { ConnectionService } from 'src/database/connection.service';
export declare class CotacaoinfoService {
    private readonly connectionService;
    knex: Knex;
    constructor(connectionService: ConnectionService);
    salvarObservacaoTempoEntrega(body: any): Promise<any>;
}
