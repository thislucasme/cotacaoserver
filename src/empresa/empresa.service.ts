import { Injectable } from '@nestjs/common';
import { restaurar } from 'src/common/cripto';
import { Empresa } from 'src/contrato/contrato.dto';
import { CriptoService } from 'src/cripto/cripto.service';
import { createTableNameWithBoolean } from 'src/util/util';
import { EmpresautilService } from './empresa.util.service';

@Injectable()
export class EmpresaService {
	
	constructor(private empresaUtil: EmpresautilService, private criptoService: CriptoService) {
	}

	async buscarEmpresa(contratoEmpresa: string, codigoEmpresa: string, codFornecedor: string) {
		const knex = await this.empresaUtil.getConexaoCliente(contratoEmpresa);

		const numeroEmpresa = await this.criptoService.publicDecript(codigoEmpresa, "Success2021");
		
		const empresas = await knex('pe01').select([
			'codigo',
			'razao',
			'empresa',
			'cgc',
			'cidade',
			'telefone'
		]).where('codigo', '=', numeroEmpresa)

		const [parsedEmpresas]: Empresa[] = empresas.map(empresa => ({
			codigo: empresa.codigo,
			razao: restaurar(empresa.razao).trim(),
			empresa: restaurar(empresa.empresa).trim(),
			cnpj: empresa.cgc,
			cidade: empresa.cidade,
			telefone: empresa.telefone
		}))
		return parsedEmpresas;
	}
	async buscarFornecedor(contratoEmpresa: string, codigoEmpresa: string, codFornecedor: string, compartilhada:boolean) {
		const codigoEmpresaDescriptografado = await this.criptoService.publicDecript(codigoEmpresa, "Success2021");
		const da02 = createTableNameWithBoolean(
			'da02',
			codigoEmpresaDescriptografado,
			compartilhada);
		const knex = await this.empresaUtil.getConexaoCliente(contratoEmpresa);
		const numeroFornecedorDescripted = await this.criptoService.publicDecript(codFornecedor, "Success2021");
		const raw = await knex.raw(`select hex(cgc2) as cnpj, emacot2 as email, nome2 as nome from ${da02} where codigo2 = '${numeroFornecedorDescripted}' limit 1`);
		const snapshot = raw[0][0];
		const cnpj = await this.criptoService.publicDecript(snapshot?.cnpj, "Success2021");
		const fornecedor = {
			...snapshot, cnpj
		}
		return fornecedor;
	}
}
