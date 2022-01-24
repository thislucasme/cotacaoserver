import { Body, Controller, Get, HttpStatus, NotFoundException, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginTDO } from 'src/models/types';
import { LoginTdo } from 'src/usuario/interfaces/login.tdo';
import { FornecedorService } from './fornecedor.service';

@Controller("fornecedor")
export class FornecedorController {
	constructor(private fornecedorService: FornecedorService, private authService: AuthService) { }

	@Post('get')
	async findFornecedorByEmail(@Body() body: LoginTDO, @Res() res: Response) {
		const result = await this.fornecedorService.findFornecedorByEmail(body.email);
		if (!result) throw new NotFoundException("Nenhum fornecedor encontrado!");
		return res.status(HttpStatus.ACCEPTED).send({ 'statusCode': HttpStatus.ACCEPTED })
	}

	@Post('verificarCredenciais')
	async findFornecedorByEmailNaTabelaCredencial(@Body() body: LoginTDO) {
		const result = await this.fornecedorService.findFornecedorByEmailCredencials(body.email);
		if (!result) throw new NotFoundException("Nenhum fornecedor encontrado!");
		return result;
	}

	@Post('login')
	async login(@Body() body: LoginTdo) {
		const fornecedor = await this.authService.validateUsuario(body.email, body.senha);
		const token = await this.authService.login(fornecedor);
		return token;
	}

	@UseGuards(JwtAuthGuard)
	@Post('teste')
	async teste(@Body() body: LoginTDO) {
		const result = await this.fornecedorService.findFornecedorByEmail(body.email);
		return result;
	}
}
