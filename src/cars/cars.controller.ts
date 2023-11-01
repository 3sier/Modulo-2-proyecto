import { Controller, Get } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('api/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  async findAll() {
    return this.carsService.findAll();
  }
}
