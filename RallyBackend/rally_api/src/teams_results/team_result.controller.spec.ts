import { Test, TestingModule } from '@nestjs/testing';
import { TeamResultController } from './team_result.controller';
import { TeamResultService } from './team_result.service';

describe('SponsorsController', () => {
  let controller: TeamResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamResultController],
      providers: [TeamResultService],
    }).compile();

    controller = module.get<TeamResultController>(TeamResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
