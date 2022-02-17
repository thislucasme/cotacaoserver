import { Body, Controller, Post } from '@nestjs/common';
import { LoginTdo } from 'src/usuario/interfaces/login.tdo';
import { AuthService } from './auth.service';

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) { }

	@Post('/login')
	async login(@Body() body: LoginTdo) {
		const usuario = await this.authService.validateUsuario(body.email, body.senha);
		const token = await this.authService.login(usuario);
		return token;
	}

	// @UseGuards(JwtAuthGuard)
	// @Post('/user')
	// async usuarioAtual(@CurrentUser() usuario: UsuarioTDO): Promise<UsuarioTDO> {
	// 	return usuario;
	// }
}
