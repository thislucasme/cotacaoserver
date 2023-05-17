import { Injectable } from '@nestjs/common';
import { ContratoService } from 'src/contrato/contrato.service';
import knexfn from 'knex';
import { CriptoService } from 'src/cripto/cripto.service';
@Injectable()
export class CompartilhadaService {

    constructor(private contratoService: ContratoService, private cryptoService: CriptoService) { }

    async retornaEcompartilhada(contrato: string, codigo: string): Promise<boolean> {
        const result = await this.contratoService.getDadosConexao(contrato);
        const codigoDescript = await this.cryptoService.decriptar(codigo);

        const knex = knexfn({
            client: 'mysql2',
            connection: {
                host: result.servidor,
                port: Number(result.porta),
                user: result.usuario,
                password: result.senha,
                database: result.banco
            }
        })
        const query = knex.select('codigo13', 'comtabes13')
            .from('pe13').where('codigo13', '=', codigoDescript)
        const resultado = await query;
        const compartilhada: boolean = resultado[0]?.comtabes13 === 'S' ? true : false;
        return compartilhada;
    }
    async retornaEcompartilhadaDa02(contrato: string, codigo: string): Promise<boolean> {
        const result = await this.contratoService.getDadosConexao(contrato);
        const codigoDescript = await this.cryptoService.decriptar(codigo);

        const knex = knexfn({
            client: 'mysql2',
            connection: {
                host: result.servidor,
                port: Number(result.porta),
                user: result.usuario,
                password: result.senha,
                database: result.banco
            }
        })
        const query = knex.select('codigo13', 'comArqFo13')
            .from('pe13').where('codigo13', '=', codigoDescript)
        const resultado = await query;
        const compartilhada: boolean = resultado[0]?.comArqFo13 === 'S' ? true : false;
        return compartilhada;
    }
}

