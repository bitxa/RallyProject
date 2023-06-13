import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from './team.controller';
import { TeamsService } from './team.service';

describe('CompetitionsController', () => {
  let controller: TeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [TeamsService],
    }).compile();

    controller = module.get<TeamController>(TeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
