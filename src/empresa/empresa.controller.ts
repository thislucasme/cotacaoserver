import { Controller, Get, Param } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresautilService } from './empresa.util.service';

@Controller('empresa')
export class EmpresaController {
	constructor(private empresaService: EmpresaService, private empresaUtilService: EmpresautilService) { }


	@Get('/:contrato/:fornecedor/:codigo')
	async getEmpresa(@Param('contrato') contrato: string, @Param('fornecedor') fornecedor: string, @Param('codigo') codigoEmpresa: string) {
		const result = await this.empresaService.buscarEmpresa(contrato, codigoEmpresa, fornecedor);
		return result;
	}


	@Get('fornecedor/:contrato/:fornecedor/:codigo')
	async getFornecedor(@Param('contrato') contrato: string, @Param('fornecedor') fornecedor: string, @Param('codigo') codigoEmpresa: string) {
		const result = await this.empresaService.buscarFornecedor(contrato, codigoEmpresa, fornecedor);
		return result;
	}


}
