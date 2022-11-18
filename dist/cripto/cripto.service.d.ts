import { ConfigService } from '@nestjs/config';
export declare class CriptoService {
    private chaveCripto;
    constructor(configService: ConfigService);
    private stripAnsi;
    publicEncript(cifra: string, chave: string): Promise<string>;
    publicDecript(cifra: string, chave: string): Promise<string>;
    encriptar(cifra: string): Promise<string>;
    decriptar(cifra: string): Promise<string>;
    restaurar(texto: string): any;
}
