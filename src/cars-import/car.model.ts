import * as mongoose from 'mongoose';

export const CarSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: Number,
  horsepower: Number,
  engine: String,
  img: String,
});

export interface Car extends mongoose.Document {
  brand: string;
  carModel: string;
  year: number;
  horsepower: number;
  engine: string;
  img: string;
}
