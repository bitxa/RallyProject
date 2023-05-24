import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CircuitsModule } from './circuits/circuits.module';
import { CategoriesModule } from './categories/categories.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [
    //! esto mandar a .env
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/products', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    UsersModule,
    CircuitsModule,
    CategoriesModule,
    CompetitionsModule,
    SponsorsModule,
    DriversModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
