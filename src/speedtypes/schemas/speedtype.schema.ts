import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpeedTypeDocument = SpeedType & Document;

@Schema({ timestamps: true })
export class SpeedType {
  @Prop({ required: true, unique: true })
  name: string;
}
export const SpeedTypeSchema = SchemaFactory.createForClass(SpeedType);
