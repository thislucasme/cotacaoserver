import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseService } from 'src/database/api-database.service copy';
import { ConnectionService } from 'src/database/connection.service';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';

@Injectable()
export class CotacaoinfoService {

	knex: Knex;

	constructor(private readonly connectionService: ConnectionService) {


	}

	async salvarObservacaoTempoEntrega(body: any) {
		//000173
		const result = await this.connectionService.getConexaoCliente(body.contratoEmpresa);
		const rows = await result.raw('select hex(codigo6) from deic01');
		return rows[0]
	}


}
