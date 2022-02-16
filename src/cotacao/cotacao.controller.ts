import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { restaurar } from 'src/common/cripto';
import { CotacaoTDOPayload, ItemCotacaoTDO } from 'src/models/types';
import { CotacaoService } from './cotacao.service';

@Controller("cotacao")
export class CotacaoController {
	constructor(private cotacaoService: CotacaoService) { }

	//const result = await this.cotacaoService.getItensCotacao('0000000001', 'AG000002');
	@Get('teste/:codCotacao/:codFornecedor/:contratoEmpresa/:codigoEmpresa')
	async teste(@Param('codCotacao') codCotacao: string, @Param('codFornecedor') codFornecedor: string, @Param('contratoEmpresa') contratoEmpresa: string, @Param('codigoEmpresa') codigoEmpresa: string) {
		//const result = await this.cotacaoService.getItensCotacao(codCotacao, codFornecedor);

		const body: CotacaoTDOPayload = {
			codigo: codCotacao,
			fornecedor: codFornecedor,
			flag: '',
			contratoEmpresa: contratoEmpresa,
			codigoEmpresa: codigoEmpresa
		}

		const total = await this.cotacaoService.calcularTotal(body);
		//return [result, total];
		return [total];
	}

	@Get('empresa/:codigo')
	async getEmpresa(@Param('codigo') codigo: string) {
		//const result = await this.cotacaoService.getEmpresaByCodigo(codigo);
		//return result;
	}

	@Get('enviar-email')
	async enviar() {
		const result = await this.cotacaoService.enviarEmail();
		return result;
	}

	@Post('/realizar-envio')
	async receber(@Body() dadosSuccess: any, @Res() res: Response) {
		const result = await this.cotacaoService.enviarEmailParaFornecedores(dadosSuccess);
		if (result.empresa.contratoEmpresaSuccess === null) {
			res.status(HttpStatus.NOT_FOUND).send();
		} else {
			for (let fornecedor of result.fornecedores) {
				if (fornecedor.enviado === false) {
					res.status(HttpStatus.PARTIAL_CONTENT).send(result)
					return;
				}
			}
			res.status(HttpStatus.OK).send(result)
		}
	}


	@Post("teste-requisicao")
	async testeRequisicao() {
		const soma = 3 % 2;
		const result = soma;
		const raiz = soma + result / soma + 3.56 * soma;
		return { soma: raiz }
	}

	@Post('update')
	async updateItemCotacao(@Body() body: ItemCotacaoTDO) {
		try {
			const result = await this.cotacaoService.updateItemCotacao(body);
			return result;
		} catch (e) {
			return { error: e }
		}

	}
	@Post('update-flag-fornecedor')
	async updateFlag(@Body() body: CotacaoTDOPayload, @Res() res: Response) {
		return body;
		// const result = await this.cotacaoService.atualizarFlagVendedor(body);

		// if (result === null) {
		// 	res.status(HttpStatus.OK).send({ data: 404 });
		// }
		//	res.status(HttpStatus.OK).send({ data: 201 });
	}
	@Post('update-flag-fornecedor-teste')
	async updateFlagTest(@Body() body: CotacaoTDOPayload, @Res() res: Response) {
		const result = await this.cotacaoService.flagUpdate(body);

		if (result.data === null) {
			if (result.code === 404) {
				res.status(HttpStatus.NOT_FOUND).send({ data: 404 });
			}
			if (result.code === 400) {
				res.status(HttpStatus.BAD_REQUEST).send({ data: 400, msg: "Confira os dados da payload" });
			}
		}
		res.status(HttpStatus.OK).send({ data: 201 });
	}

	@Post('verificar-flags')
	async verificarFlags(@Body() body: CotacaoTDOPayload, @Res() res: Response) {
		const result = await this.cotacaoService.consultarFlags(body);
		res.status(HttpStatus.ACCEPTED).send(result)
	}


	@Get('chave')
	async converter(@Body() body: any) {
		return restaurar(body.cifra)
	}


	async contarItens() {

	}


	@Post('calcular-total')
	async calcularTotal(@Body() body: CotacaoTDOPayload) {
		const result = await this.cotacaoService.calcularTotal(body);
		return result;
	}



	@Get('xml')
	async xml(@Body() body: any, @Res() res: Response) {
		console.log(body.fornecedores)
		console.log(restaurar('56C387C3AA7565C5BE7A15C2AAC39E7E78C39C26'));
		//console.log(js2xml(teste, { compact: true, spaces: 4 }))
		res.send(body);
	}
}
