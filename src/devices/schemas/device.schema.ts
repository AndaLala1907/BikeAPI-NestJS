import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeviceStatus = 'paired' | 'unpaired';

@Schema({ timestamps: true })
export class Device {
  @Prop({ required: true })
  bike_id: string;

  @Prop({ required: true, unique: true })
  barcode: string;

  @Prop({ required: true, enum: ['paired', 'unpaired'], default: 'unpaired' })
  status: DeviceStatus;

  @Prop({ required: true, unique: true })
  deviceId: string;

  @Prop()
  pairedAt?: Date;

  @Prop()
  unpairedAt?: Date;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;
  @Prop({ default: false })
  isActive: boolean;
}

export type DeviceDocument = Device & Document;
export const DeviceSchema = SchemaFactory.createForClass(Device);
