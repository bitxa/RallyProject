import { Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CompetitionsController } from './competitions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Competition, CompetitionsSchema } from './schema/competition.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Competition.name,
        schema: CompetitionsSchema,
      },
    ]),
  ],
  controllers: [CompetitionsController],
  providers: [CompetitionsService],
})
export class CompetitionsModule {}
