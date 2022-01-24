import { Controller, Get } from '@nestjs/common';
import { ContratoService } from './contrato.service';

@Controller('contrato')
export class ContratoController {
	constructor(private contratoService: ContratoService) {

	}

	@Get()
	async teste() {
		return await this.contratoService.getDadosConexao('000173');
	}

}
