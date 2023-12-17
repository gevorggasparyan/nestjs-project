// app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://172.17.0.2:27017/carDB'),
    CarsModule,
  ],
})
export class AppModule {}
