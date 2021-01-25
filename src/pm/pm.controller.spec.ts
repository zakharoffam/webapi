import { Test, TestingModule } from '@nestjs/testing';
import { PmController } from './pm.controller';

describe('PmController', () => {
  let controller: PmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PmController],
    }).compile();

    controller = module.get<PmController>(PmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
