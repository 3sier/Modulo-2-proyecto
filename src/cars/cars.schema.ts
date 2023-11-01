import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from '../cars-import/car.model';

@Injectable()
export class CarsService {
  constructor(@InjectModel('Car') private readonly carModel: Model<Car>) {}
}

export const CarsSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: Number,
  horsepower: Number,
  engine: String,
});
