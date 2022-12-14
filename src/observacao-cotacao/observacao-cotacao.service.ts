import { BadGatewayException, BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContratoService } from 'src/contrato/contrato.service';
import { CriptoService } from 'src/cripto/cripto.service';
import { EmpresautilService } from 'src/empresa/empresa.util.service';
import { ObservacaoGeralTDO } from 'src/models/types';
import { createTableName } from 'src/util/util';

@Injectable()
export class ObservacaoCotacaoService {

    private chave: string;

    constructor(configService: ConfigService, private contratoService: ContratoService, private criptoService: CriptoService, private empresaUtil: EmpresautilService) {
        const chave = configService.get('chaveCripto');
        if (!chave)
            throw new Error(
                'VARIAVEL DE AMBIENTE SITE_SUCCESS_DB_HOST NÃO CONFIGURADA!'
            )
        this.chave = chave;
    }


    async salvarObservacao(observacao: ObservacaoGeralTDO) {

        // const knex = await this.empresaUtil.getConexaoCliente(observacao?.contratoEmpresa);
        // const empresaDescriptografada = await this.criptoService.decriptar(observacao.codigoEmpresa)
        // const cotacaoDescriptografada = await this.criptoService.decriptar(observacao.cotacao)


        // const query = knex(createTableName('dece', empresaDescriptografada ?? ''))
        //     .update({ obscot6: observacao?.observacao })
        //     .where("codigo6", "=", cotacaoDescriptografada)

        // const result = await query;

        // if (result === 0) {
        //     throw new BadRequestException("Ocorreu um erro ao salvar a observação.")
        // }
        throw new BadGatewayException('rota vazia')
    }

    async retornaObservacao(observacao: ObservacaoGeralTDO) {
    //     const knex = await this.empresaUtil.getConexaoCliente(observacao?.contratoEmpresa);
    //     const empresaDescriptografada = await this.criptoService.decriptar(observacao.codigoEmpresa)
    //     const cotacaoDescriptografada = await this.criptoService.decriptar(observacao.cotacao)

    //     const query = knex()
    //         .select({ observacao: 'obscot6' })
    //         .from(createTableName('dece', empresaDescriptografada ?? ''))
    //         .where("codigo6", "=", cotacaoDescriptografada).limit(1)

    //     console.log(query.toQuery())

    //     const result = await query;

    //     if (result.length === 0) {
    //         throw new HttpException('NoCotent', HttpStatus.NO_CONTENT)
    //     }

       
    //     return result[0];
    throw new BadGatewayException('rota vazia')
     }
}
