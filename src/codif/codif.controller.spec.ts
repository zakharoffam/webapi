import { Test, TestingModule } from '@nestjs/testing';
import { CodifController } from './codif.controller';

describe('CodifController', () => {
  let controller: CodifController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodifController],
    }).compile();

    controller = module.get<CodifController>(CodifController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
