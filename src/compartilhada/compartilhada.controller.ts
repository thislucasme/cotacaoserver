import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/auth/utils/currentUser';
import { CompartilhadaService } from './compartilhada.service';

@Controller('compartilhada')
export class CompartilhadaController {
    constructor(private compartilhadaService:CompartilhadaService){}
    @Get()
    get(){
        return this.compartilhadaService.retornaEcompartilhada('1EC7FA7D75AE', '068C');
    }
 }
