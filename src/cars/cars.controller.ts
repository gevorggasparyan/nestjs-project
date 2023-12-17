// car.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CarService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './interfaces/car.interface';

@Controller('cars')
export class CarController {
    constructor(private readonly carService: CarService) {}

    @Post()
    async create(@Body() createCarDto: CreateCarDto): Promise<Car> {
        return this.carService.create(createCarDto);
    }

    @Get()
    async findAll(): Promise<Car[]> {
        return this.carService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Car> {
        return this.carService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto): Promise<Car> {
        return this.carService.update(id, updateCarDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Car> {
        return this.carService.delete(id);
    }
}
