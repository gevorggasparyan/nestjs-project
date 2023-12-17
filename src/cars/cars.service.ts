// car.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from './interfaces/car.interface';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
    constructor(@InjectModel('Car') private readonly carModel: Model<Car>) {}

    async create(createCarDto: CreateCarDto): Promise<Car> {
        const createdCar = new this.carModel(createCarDto);
        return createdCar.save();
    }

    async findAll(): Promise<Car[]> {
        return this.carModel.find().exec();
    }

    async findOne(id: string): Promise<Car> {
        return this.carModel.findById(id).exec();
    }

    async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
        return this.carModel.findByIdAndUpdate(id, updateCarDto, { new: true }).exec();
    }

    async delete(id: string): Promise<Car> {
        return this.carModel.findOneAndDelete({id}).exec();
    }
}
