import { Test, TestingModule } from '@nestjs/testing';
import { CompetitorsService } from './competitors.service';

describe('CompetitorsService', () => {
  let service: CompetitorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetitorsService],
    }).compile();

    service = module.get<CompetitorsService>(CompetitorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
