

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CotacaoinfoService } from './cotacaoinfo.service';

@Controller('cotacaoinfo')
export class CotacaoinfoController {

	constructor(private cotacaoInfoService: CotacaoinfoService) { }

	@Post()
	async get(@Body() body: any) {
		const result = await this.cotacaoInfoService.salvarObservacaoTempoEntrega(body)
		return result;
	}

}
