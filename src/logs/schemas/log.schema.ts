import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({ timestamps: true })
export class Log {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: string;

  @Prop({ type: Types.ObjectId, ref: 'Journey', required: true })
  journey_id: string;

  @Prop({ type: [[Number]], default: [] })
  coordinates: number[][];

  @Prop({ default: false })
  ended: boolean;
  @Prop({ type: Date, default: null })
  deletedAt?: Date;
  @Prop({ required: true })
  type: 'start' | 'ping' | 'stop';
}

export const LogSchema = SchemaFactory.createForClass(Log);
