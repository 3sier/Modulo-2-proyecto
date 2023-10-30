import { Injectable } from '@nestjs/common';
import { CarsService } from '../cars/cars.service';
import { Car } from './car.model';

@Injectable()
export class CarsImportService {
  constructor(private readonly carsService: CarsService) {}

  async importCars(carsData: Car[]): Promise<Car[]> {
    const createdCars: Car[] = await this.carsService.createMany(carsData);
    return createdCars;
  }
}
