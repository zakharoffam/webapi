import { Test, TestingModule } from '@nestjs/testing';
import { PmService } from './pm.service';

describe('PmService', () => {
  let service: PmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PmService],
    }).compile();

    service = module.get<PmService>(PmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
