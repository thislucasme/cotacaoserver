import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"
import { jwtConstants } from "src/auth/constants";
import { UsuarioService } from "src/usuario/usuario.service";
import { Payload } from './../usuario/interfaces/payload.validate';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private usuarioService: UsuarioService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret,
		})
	}
	async validate(payload: Payload) {
		const usuario = await this.usuarioService.findUserById(payload.id);
		return { ...usuario, senha: undefined };
	}

}