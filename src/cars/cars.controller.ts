import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  private cars = [];

  @Get()
  findAll(): any[] {
    return this.cars;
  }

  @Post()
  create(@Body() car: any): string {
    this.cars.push(car);
    return 'Car created: ${car.model}';
  }
}
