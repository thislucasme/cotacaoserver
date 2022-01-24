import { Controller, Get } from '@nestjs/common';
import { CotacaoTDOPayload } from 'src/models/types';
import { TotalService } from './total.service';

@Controller('total')
export class TotalController {

	constructor(private totalService: TotalService) { }

	@Get()
	async teste() {

		const body: CotacaoTDOPayload = {
			codigo: '1ECFFA7D7D9E7A05AAEE',
			fornecedor: 'A6D7FA7D7D9E798E',
			flag: '',
			contratoEmpresa: '1EDFFA7D75A6',
			codigoEmpresa: '1ECF'
		}
		return this.totalService.calcularTotal(body);
	}
}
