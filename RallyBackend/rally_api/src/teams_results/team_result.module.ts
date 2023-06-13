import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamResultService } from './team_result.service';
import { TeamResultController } from './team_result.controller';
import { TeamResult, TeamResultSchema } from './schema/team_result.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TeamResult.name,
        schema: TeamResultSchema,
      },
    ]),
  ],
  controllers: [TeamResultController],
  providers: [TeamResultService],
})
export class SponsorsModule {}
