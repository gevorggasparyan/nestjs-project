// car.controller.ts

import {Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req, UnauthorizedException} from '@nestjs/common';
import { CarService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './interfaces/car.interface';
import { JwtAuthGuard } from "../auth/jwt-auth-guard";

@Controller('cars')
export class CarController {
    constructor(private readonly carService: CarService) {}

    @UseGuards(JwtAuthGuard) // Apply the JWT authentication guard
    @Post('add')
    async addCar(@Req() req, @Body() createCarDto: CreateCarDto) {
        // Get the authenticated user from the request
        const authenticatedUser = req.user;

        if (!authenticatedUser) {
            throw new UnauthorizedException();
        }
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
