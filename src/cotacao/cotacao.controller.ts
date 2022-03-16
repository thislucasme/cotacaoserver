import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { restaurar } from 'src/common/cripto';
import { CotacaoService } from './cotacao.service';
import * as moment from 'moment';
moment.locale('pt-br')

//testes

@Controller("cotacao")
export class CotacaoController {
	constructor(private cotacaoService: CotacaoService) { }


	@Get('enviar-email')
	async enviar() {
		const result = await this.cotacaoService.enviarEmail();
		return result;
	}

	//

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

	@Get('data')
	async getData(@Body() body: any) {

		const isValid = moment(moment(body.vencimento)).isValid();
		if (isValid) {
			let vencimento: moment.Moment;

			if (!body.vencimento) {
				vencimento = moment().add(30, 'days');
			} else {
				console.log(moment(moment(body.vencimento)).isValid())
				vencimento = moment(body.vencimento);
				console.log(vencimento.format('L'))
			}

			const isVencido: boolean = this.isVencido(vencimento);
			return { vencimento, isVencido }
		} else {
			return { "msg": "data inválida" }
		}
	}

	isVencido(vencimento: moment.Moment) {
		//const dataAtual = moment('28/09/2022', 'DD/MM/YYYY').format('L');

		const now = moment();
		console.log()

		var diffDays = moment.duration(vencimento.diff(now))
		if (diffDays.asHours() < 0) {
			return true;
		}
		return false;
	}



}
