import { Controller, Get } from '@nestjs/common';
import { ApiDatabaseService } from 'src/database/api-database.service';
import { UsuarioService } from 'src/usuario/usuario.service';

@Controller('testes')
export class UsuarioController {
	constructor(private usuarioService: UsuarioService, private databaseService: ApiDatabaseService) { }


	@Get()
	async teste() {
		const result = await this.usuarioService.teste();
		return result;
	}
}
