import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { asyncExec, criptLinuxExe, decriptLinuxExe } from './hbcrypt'
import { restaurar } from 'src/common/cripto'

@Injectable()
export class CriptoService {
  private chaveCripto: string

  constructor(configService: ConfigService) {
    const chave = configService.get('chaveCripto')
    if (!chave) {
      throw new Error(
        'Chave de criptografia nao configurada! configurar env var CHAVE_CRIPTO'
      )
    }
    this.chaveCripto = chave
  }

  private stripAnsi(str: string) {
    return str.replace(
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqsry=><]/g,
      ''
    )
  }

  async publicEncript(cifra: string, chave: string) {
    const { stderr, stdout } = await asyncExec(
      `${criptLinuxExe} ${cifra} ${chave}`
    )
    if (stderr) {
      console.log(`erro: ${stderr.toString()}`)
    }
    return this.stripAnsi(stdout)
  }

  async publicDecript(cifra: string, chave: string) {
    const { stderr, stdout } = await asyncExec(
      `${decriptLinuxExe} ${cifra} ${chave}`
    )
    if (stderr) {
      console.log(`erro: ${stderr.toString()}`)
    }
    return this.stripAnsi(stdout)
  }

  async encriptar(cifra: string) {
    return this.publicEncript(cifra, this.chaveCripto)
  }

  async decriptar(cifra: string) {
    return this.publicDecript(cifra, this.chaveCripto)
  }

  async restaurar(texto: string) {
    return this.restaurar(texto);
  }
}
