import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

export const CarsSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: Number,
  horsepower: Number,
});
