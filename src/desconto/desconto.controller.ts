import { Body, Controller, Get, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { response, Response } from 'express';

import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { CompartilhadaService } from 'src/compartilhada/compartilhada.service';
import { DescontoTDO } from 'src/models/types';
import { DescontoService } from './desconto.service';


@Controller('desconto')
export class DescontoController {
	constructor(private descontoService: DescontoService, private compartilhadaService:CompartilhadaService) { }

	@Put()
	async adcionarDesconto(@Body() body: DescontoTDO, @Res() res: Response
	) {
		const compartilhada = await this.compartilhadaService.retornaEcompartilhada(body?.dados?.contratoEmpresa, body?.dados?.codigoEmpresa)
		
		const result = await this.descontoService.adicionarDesconto(body, compartilhada);
		if (result.statusCode === HttpStatus.CREATED) {
			res.status(HttpStatus.CREATED).send(result);
			return;
		} else if (result.statusCode === HttpStatus.BAD_REQUEST) {
			res.status(HttpStatus.BAD_REQUEST).send(result);
			return;
		}

	}

	@Put('dev')
	async descontoDev(@Body() body: DescontoTDO, @Res() res: Response) {
		const compartilhada = await this.compartilhadaService.retornaEcompartilhada(body?.dados?.contratoEmpresa, body?.dados?.codigoEmpresa)
		const result = await this.descontoService.adicionarDescontoDev(body, compartilhada)
		if (result.statusCode === HttpStatus.CREATED) {
			res.status(HttpStatus.CREATED).send(result);
		} else if (result.statusCode === HttpStatus.BAD_REQUEST) {
			res.status(HttpStatus.BAD_REQUEST).send(result);
		}

	}

	@Post('teste')
	async desconto(@Body() body: any) {

		const result = this.descontoService.teste(body);
		return result;
	}

	@Get('relatorio')
	async relatorio(@Body() body: any) {
		return this.descontoService.gerar();
	}




}
