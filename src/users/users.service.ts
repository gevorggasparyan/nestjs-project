// users/users.service.ts

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async findOne(username: string): Promise<User | undefined> {
        return this.userModel.findOne({ username }).exec();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { username, password } = createUserDto;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the saltRounds as needed

        const newUser = new this.userModel({
            username,
            password: hashedPassword,
        });

        return newUser.save();
    }
}
