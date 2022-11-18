import { MailerService } from '@nestjs-modules/mailer';
import { HttpStatus } from '@nestjs/common';
import { Empresa } from 'src/contrato/contrato.dto';
import { CriptoService } from 'src/cripto/cripto.service';
import { DatabaseCotacaoService } from 'src/database/database-cotacao.service';
import { CotacaoTDOPayload, DadosSuccess, PayloadEnvioEmail, PayloadSuccess } from 'src/models/types';
import { ContratoService } from '../contrato/contrato.service';
export declare class CotacaoService {
    private readonly mailer;
    private cotacaoDatabaseService;
    private contratoService;
    private criptoService;
    constructor(mailer: MailerService, cotacaoDatabaseService: DatabaseCotacaoService, contratoService: ContratoService, criptoService: CriptoService);
    getEmpresaByCodigo(codigo: string, codigoEmpresa: string): Promise<Empresa | null>;
    updateItemCotacao(itemCotacao: any): Promise<{
        status: HttpStatus;
        msg: string;
    }>;
    enviarEmail(): Promise<any>;
    sendEmailTo(email: string, url: string, empresa: Empresa, fornecedor: string): Promise<any>;
    verificarTodosCampos(cotacaoPayLoad: any): {
        status: boolean;
    };
    verificarCampo(dadosSuccess: DadosSuccess): boolean;
    enviarEmailParaFornecedores(dados: PayloadSuccess): Promise<PayloadEnvioEmail | null>;
    isAllPreenchido(body: CotacaoTDOPayload): Promise<void>;
}
