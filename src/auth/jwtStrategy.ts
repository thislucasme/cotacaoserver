import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "src/usuario/interfaces/payload.validate";
import { UsuarioService } from "src/usuario/usuario.service";
import { jwtConstants } from "./constants";

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