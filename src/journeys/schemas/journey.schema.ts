import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
// Mongoose schema for journey entity
@Schema({ timestamps: true }) //adds createdAt and updatedAt
export class Journey {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Device', required: true })
  device_id: Types.ObjectId;

  @Prop()
  device_barcode: string;

  @Prop({ type: Types.ObjectId, ref: 'Bike', required: true })
  bike_id: Types.ObjectId;

  @Prop()
  bike_barcode: string;

  @Prop()
  bike_type: string;

  @Prop()
  bike_weight: number;

  @Prop({ type: Types.ObjectId, ref: 'SpeedType' })
  speedType_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'RoadType' })
  roadType_id: Types.ObjectId;

  @Prop()
  startTime: Date;

  @Prop()
  endTime?: Date;

  @Prop({ default: 0 })
  caloriesBurned: number;
  @Prop()
  deletedAt?: Date;
}

export type JourneyDocument = Journey & Document;
export const JourneySchema = SchemaFactory.createForClass(Journey);
