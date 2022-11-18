import { criptoUmDto } from './cripto.dto';
import { CriptoService } from './cripto.service';
export declare class CriptoController {
    private readonly cripto;
    constructor(cripto: CriptoService);
    decriptarUm(body: criptoUmDto): Promise<string>;
    encriptarUm(body: criptoUmDto): Promise<string>;
}
