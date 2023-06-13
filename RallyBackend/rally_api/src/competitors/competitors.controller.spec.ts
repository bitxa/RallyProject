import { Test, TestingModule } from '@nestjs/testing';
import { CompetitorsController } from './competitors.controller';
import { CompetitorsService } from './competitors.service';

describe('CompetitorsController', () => {
  let controller: CompetitorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetitorsController],
      providers: [CompetitorsService],
    }).compile();

    controller = module.get<CompetitorsController>(CompetitorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
