import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { HistoricoProdutosParametro, HistoricoProdutosTDO } from 'src/models/types';
import { HistoricoTributosService } from './historico-tributos.service';
import { Response } from 'express';
@Controller('historico-tributos')
export class HistoricoTributosController {
	constructor(private historicoTributos: HistoricoTributosService) {

	}

	@Post()
	async buscarHistoricoDeProdutoBy(@Body() body: HistoricoProdutosParametro, @Res() res: Response) {
		const result = await this.historicoTributos.buscarHistoricoBy(body);
		if (result?.errno === 1146) {
			res.status(HttpStatus.NO_CONTENT).send()
			console.log(result?.errno)
			return;
		}
		result.length == 0 ? res.status(HttpStatus.NO_CONTENT).send() : res.status(HttpStatus.OK).send(result);
	}
}
