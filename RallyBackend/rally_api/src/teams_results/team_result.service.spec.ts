import { Test, TestingModule } from '@nestjs/testing';
import { TeamResultService } from './team_result.service';

describe('SponsorsService', () => {
  let service: TeamResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamResultService],
    }).compile();

    service = module.get<TeamResultService>(TeamResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
