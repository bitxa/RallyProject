import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CircuitsModule } from './circuits/circuits.module';
import { CategoriesModule } from './categories/categories.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { CompetitorsModule } from './competitors/competitors.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    CircuitsModule,
    CategoriesModule,
    CompetitionsModule,
    SponsorsModule,
    CompetitorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
