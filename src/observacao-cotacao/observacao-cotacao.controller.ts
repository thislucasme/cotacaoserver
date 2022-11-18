import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { CotacaoTDOPayload, ObservacaoGeralTDO } from 'src/models/types';
import { ObservacaoCotacaoService } from './observacao-cotacao.service';

@Controller('observacao-cotacao')
export class ObservacaoCotacaoController {

    constructor(private observacaoService: ObservacaoCotacaoService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async criarObservacao(@Body() body: ObservacaoGeralTDO) {
        await this.observacaoService.salvarObservacao(body)
    }

    @Post('get')
    async getObservacao(@Body() body: ObservacaoGeralTDO) {
        return await this.observacaoService.retornaObservacao(body)
    }
}
