import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { restaurar } from 'src/common/cripto'
import { criptoUmDto } from './cripto.dto'
import { CriptoService } from './cripto.service'

@ApiTags('cripto')
@Controller('cripto')
export class CriptoController {
  constructor(private readonly cripto: CriptoService) { }

  @Post('decrypt')
  async decriptarUm(@Body() body: criptoUmDto) {
    const { cifra, chave } = body
    const decoded = await this.cripto.publicDecript(cifra, chave)
    return decoded
  }
  @Post('encrypt')
  async encriptarUm(@Body() body: criptoUmDto) {
    console.log(body)
    const { cifra, chave } = body
    const encoded = await this.cripto.publicEncript(cifra, chave)
    return encoded
  }

}
