import { Controller, Get } from '@nestjs/common';

@Controller('/api/cars')
export class CarsController {
  @Get()
  findAll(): string {
    return 'This action returns all cars';
  }
}
