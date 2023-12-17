import { Schema, Document } from 'mongoose';

export interface Car extends Document {
    companyName: string;
    carModel: string;
    year: number;
}

export const CarSchema = new Schema({
    companyName: { type: String, required: true },
    carModel: { type: String, required: true },
    year: { type: Number, required: true },
});
