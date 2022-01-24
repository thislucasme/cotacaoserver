import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FornecedorService } from 'src/fornecedor/fornecedor.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { UsuarioTDO } from 'src/usuario/usuarioDTO';

@Injectable()
export class AuthService {

	constructor(private fornecedorService: FornecedorService, private jwtService: JwtService) { }

	async validateUsuario(email: string, senha: string): Promise<Partial<UsuarioTDO>> {
		const usuario = await this.fornecedorService.findFornecedorByEmailCredencials(email);
		if (!usuario) throw new UnauthorizedException("Nenhum usuário cadastrado com esse email!");
		if (senha !== usuario.senha) throw new UnauthorizedException("Nenhum usuário cadastrado com as credenciais informadas!");
		return { ...usuario, senha: undefined };
	}

	async login(usuario: Partial<UsuarioTDO>) {
		return { access_token: this.jwtService.sign({ email: usuario.email, id: usuario.id }) };
	}
}
