import * as mongoose from 'mongoose';

export const CarsSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: Number,
  Traction: String,
});
