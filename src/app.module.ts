import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsModule } from './cars/cars.module';
import { DatabaseConfig } from './database.config';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(DatabaseConfig.uri, {
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    CarsModule,
    AuthModule,
    HealthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}