import { ApiProperty } from "@nestjs/swagger";
export class LoginTdo {
	@ApiProperty({
		description: 'Email do usuário',
		example: 'email@gmail.com'
	})
	email: string;
	@ApiProperty()
	senha: string;
}