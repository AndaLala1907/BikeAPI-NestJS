import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// bike schema defintion with timestamp and soft delete
@Schema({ timestamps: true }) //adds createdAt and updtedAt
export class Bike {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  weight: number;

  @Prop({ required: true })
  user_id: string;

  @Prop()
  speedType: string;

  @Prop()
  roadType: string;

  @Prop({ required: true, unique: true })
  barcode: string;
  @Prop()
  deletedAt?: Date;
}

export type BikeDocument = Bike & Document;
export const BikeSchema = SchemaFactory.createForClass(Bike);
