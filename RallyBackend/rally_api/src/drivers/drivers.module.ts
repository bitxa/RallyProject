import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriversSchema } from './schema/driver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Driver.name,
        schema: DriversSchema,
      },
    ]),
  ],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}
