// car.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarController } from './cars.controller';
import { CarService } from './cars.service';
import { CarSchema } from './car.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarsModule {}
