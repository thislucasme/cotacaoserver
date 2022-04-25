import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { knex } from 'src/db/db';
import { LoginTdo } from 'src/usuario/interfaces/login.tdo';
import { UsuarioTDO } from 'src/usuario/usuarioDTO';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './utils/currentUser';

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) { }

	@Post('/login')
	async login(@Body() body: LoginTdo) {
		const usuario = await this.authService.validateUsuario(body.email, body.senha);
		const token = await this.authService.login(usuario);
		return token;
	}

	//o seu tá dando como se não tivesse 
	@UseGuards(JwtAuthGuard)
	@Post('/user')
	async usuarioAtual(@CurrentUser() usuario: UsuarioTDO): Promise<UsuarioTDO> {
		return usuario;
	}


	@Post('/banco')
	async teste() {
		this.testeTransaction();
		return null;
	}

	async testeTransaction() {
		try {
			await knex.transaction(async trans => {

				await knex.insert({ nome: "Lucas" }).table("teste");
				await knex.insert({ nome: "Silva" }).table("teste");
				await knex.insert({ nome: "Dias" }).table("teste");

			})

		} catch (err) {
			console.log("Error")
		}
	}
}
