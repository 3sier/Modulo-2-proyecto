import { Controller, Post, Body } from '@nestjs/common';
import { CarsImportService } from './cars-import.service';
import { Car } from './car.model';

@Controller('cars-import')
export class CarsImportController {
  constructor(private readonly carsImportService: CarsImportService) {}

  @Post()
  async import(@Body() carsData: Car[]): Promise<Car[]> {
    const importedCars = await this.carsImportService.importCars(carsData);
    return importedCars;
  }
}
