import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsModule } from './cars/cars.module';
import { DatabaseConfig } from './database.config';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [MongooseModule.forRoot(DatabaseConfig.uri), CarsModule, AuthModule, HealthModule], 
  controllers: [],
  providers: [],
})
export class AppModule {}
