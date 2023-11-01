import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from '../cars-import/car.model';

@Injectable()
export class CarsService {
  constructor(@InjectModel('Car') private readonly carModel: Model<Car>) {}

  async createMany(carsData: Car[]): Promise<Car[]> {
    return this.carModel.create(carsData);
  }

  async findAll(): Promise<Car[]> {
    const cars = await this.carModel.find().exec();
    console.log('Retrieved cars:', cars);
    return cars;
  }
  catch(error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
}
