import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoadTypeDocument = RoadType & Document;

@Schema({ timestamps: true })
// mongoose schema for road types
export class RoadType {
  @Prop()
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: Number })
  multiplier?: number;

  @Prop({ default: null })
  deletedAt?: Date;
}

export const RoadTypeSchema = SchemaFactory.createForClass(RoadType);
