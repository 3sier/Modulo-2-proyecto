import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from '../cars-import/car.model';

@Injectable()
export class CarsService {
  constructor(@InjectModel('Car') private readonly carModel: Model<Car>) {}

  async create(car: Car): Promise<Car> {
    const createdCar = new this.carModel(car);
    return createdCar.save();
  }

  async findAll(): Promise<Car[]> {
    return this.carModel.find().exec();
  }

  async createMany(cars: Car[]): Promise<Car[]> {
    const createdCars = await this.carModel.create(cars);
    return createdCars;
  }
}
