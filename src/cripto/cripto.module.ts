import { Module } from '@nestjs/common'
import { CriptoController } from './cripto.controller'
import { CriptoService } from './cripto.service'

@Module({
  controllers: [CriptoController],
  providers: [CriptoService],
  exports: [CriptoService],
})
export class CriptoModule {}
