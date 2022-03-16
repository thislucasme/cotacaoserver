import { Body, Controller, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { DescontoTDO } from 'src/models/types';
import { DescontoService } from './desconto.service';

@Controller('desconto')
export class DescontoController {
	constructor(private descontoService: DescontoService) { }

	@Put()
	async adcionarDesconto(@Body() body: DescontoTDO, @Res() res: Response
	) {
		const result = await this.descontoService.adicionarDesconto(body);
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
		const result = this.descontoService.adicionarDescontoDev(body)
		res.json(result)
	}

	@Post('teste')
	async desconto(@Body() body: any) {

		const result = this.descontoService.teste(body);
		return result;
	}
}
