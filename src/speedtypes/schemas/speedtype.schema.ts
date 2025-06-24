import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpeedTypeDocument = SpeedType & Document;

@Schema({ timestamps: true })
// schema for speed type entity (low, medium, high etc.)
export class SpeedType {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ default: null })
  deletedAt?: Date;
}
export const SpeedTypeSchema = SchemaFactory.createForClass(SpeedType);
