import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
}
