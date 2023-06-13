import { Module } from '@nestjs/common';
import { TeamsService } from './team.service';
import { TeamController } from './team.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, CompetitionsSchema } from './schema/team.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Team.name,
        schema: CompetitionsSchema,
      },
    ]),
  ],
  controllers: [TeamController],
  providers: [TeamsService],
})
export class CompetitionsModule {}
