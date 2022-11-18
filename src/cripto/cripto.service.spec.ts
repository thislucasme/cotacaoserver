import { Test, TestingModule } from '@nestjs/testing';
import { CriptoService } from './cripto.service';

describe('CriptoService', () => {
  let service: CriptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CriptoService],
    }).compile();

    service = module.get<CriptoService>(CriptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
