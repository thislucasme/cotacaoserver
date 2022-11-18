import { Controller, Get } from '@nestjs/common';
import { ClienteService } from 'src/cliente/cliente.service';
import { CotacaoService } from 'src/cotacao/cotacao.service';

@Controller('banco')
export class ClienteController {
	constructor(private clienteService: ClienteService, private cotacaoService: CotacaoService) { }

	@Get()
	async teste() {

		// const body: CotacaoTDOPayload = {
		// 	codigo: "1ECFFA7D7D9E7A05AAEE",
		// 	fornecedor: "A6D7FA7D7D9E798E",
		// 	flag: '',
		// 	contratoEmpresa: "1EDFFA7D75A6",
		// 	codigoEmpresa: ''
		// }

		;//return await this.clienteService.getItensCotacao(body.codigo, body.fornecedor, body.contratoEmpresa, "01");

		//return this.clienteService.getEmpresas('1EDFFA7D75A6');
	}
}
