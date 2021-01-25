import { Test, TestingModule } from '@nestjs/testing';
import { CodifService } from './codif.service';

describe('CodifService', () => {
  let service: CodifService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodifService],
    }).compile();

    service = module.get<CodifService>(CodifService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
