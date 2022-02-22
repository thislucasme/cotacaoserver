import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { restaurar } from 'src/common/cripto';
import { CotacaoService } from './cotacao.service';

//testes

@Controller("cotacao")
export class CotacaoController {
	constructor(private cotacaoService: CotacaoService) { }


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
	@Get('chave')
	async converter(@Body() body: any) {
		return restaurar(body.cifra)
	}

}
