import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SponsorsService } from './sponsors.service';
import { SponsorsController } from './sponsors.controller';
import { Sponsor, SponsorsSchema } from './schema/sponsor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Sponsor.name,
        schema: SponsorsSchema,
      },
    ]),
  ],
  controllers: [SponsorsController],
  providers: [SponsorsService],
})
export class SponsorsModule {}
