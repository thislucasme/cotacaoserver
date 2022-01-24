import { Test, TestingModule } from '@nestjs/testing';
import { CriptoController } from './cripto.controller';

describe('CriptoController', () => {
  let controller: CriptoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CriptoController],
    }).compile();

    controller = module.get<CriptoController>(CriptoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
