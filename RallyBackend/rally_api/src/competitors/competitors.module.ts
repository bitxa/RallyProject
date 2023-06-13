import { Module } from '@nestjs/common';
import { CompetitorsService } from './competitors.service';
import { CompetitorsController } from './competitors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Competitor, CompetitorsSchema } from './schema/competitor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Competitor.name,
        schema: CompetitorsSchema,
      },
    ]),
  ],
  controllers: [CompetitorsController],
  providers: [CompetitorsService],
})
export class CompetitorsModule {}
