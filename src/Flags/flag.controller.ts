import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CotacaoTDOPayload } from 'src/models/types';
import { Response } from 'express';
import { FlagService } from './flag.service';

@Controller('flag')
export class FlagController {
	constructor(private flagService: FlagService) { }

	@Post('verificar-flags')
	async verificarFlags(@Body() body: CotacaoTDOPayload, @Res() res: Response) {
		const result = await this.flagService.consultarFlags(body);
		res.status(HttpStatus.ACCEPTED).send(result)
	}

	@Post('finalizar-cotacao')
	async finalizarCotacao(@Body() body: CotacaoTDOPayload, @Res() res: Response) {
		const result = await this.flagService.finalizarCotacao(body);

		if (result.data === null) {
			if (result.code === 404) {
				res.status(HttpStatus.NOT_FOUND).send({ data: 404 });
				return;
			}
			if (result.code === 400) {
				res.status(HttpStatus.BAD_REQUEST).send({ data: 400, msg: "Confira os dados da payload" });
				return;
			}
		}
		res.status(HttpStatus.OK).send({ data: 201 });

		return result;
	}

}
