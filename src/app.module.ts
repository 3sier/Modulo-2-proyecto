import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsModule } from './cars/cars.module';
import { DatabaseConfig } from './database.config';

@Module({
  imports: [MongooseModule.forRoot(DatabaseConfig.uri), CarsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
