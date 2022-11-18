import { Injectable } from '@nestjs/common';
import { ApiDatabaseService } from 'src/database/api-database.service';

export class Usuario {
	nome: string;
	email: string;
	id: number;
	senha: string;
}

@Injectable()
export class UsuarioService {

	constructor(private databaseService: ApiDatabaseService) {
	}

	private credentials: Usuario = {
		email: 'thislucasme@gmail.com',
		nome: 'lucas',
		id: 1,
		senha: '1234'
	}

	async findUserById(id: number): Promise<Usuario | null> {
		if (id === this.credentials.id) return this.credentials;
		return null;
	}

	async findUserByEmail(email: string): Promise<Usuario | null> {
		if (email === this.credentials.email) return this.credentials;
		return null;
	}

	async teste() {
		return await this.databaseService.getConnection().select().table('cliente_entity');
	}

}
