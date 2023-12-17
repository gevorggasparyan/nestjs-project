// users/user.model.ts

import { Document, Schema } from 'mongoose';

export interface User extends Document {
    username: string;
    password: string;
}

export const UserSchema = new Schema({
    username: String,
    password: String
});