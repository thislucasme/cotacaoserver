import { Body, Controller, HttpStatus, Put, Res } from '@nestjs/common';
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
}
