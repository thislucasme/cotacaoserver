import { Controller, Get } from '@nestjs/common';
import { CotacaoTDOPayload } from 'src/models/types';
import { TotalService } from './total.service';

@Controller('total')
export class TotalController {

	constructor(private totalService: TotalService) { }

	@Get()
	async teste() {
	}
}
