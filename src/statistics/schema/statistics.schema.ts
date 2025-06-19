import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created_at' } })
export class Statistic {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: Number, required: true })
  distance: number;

  @Prop({ type: Number, required: true })
  duration: number;

  @Prop({ type: Number, required: true })
  calories: number;

  @Prop({ type: Number, required: true })
  avg_speed: number;

  @Prop()
  deletedAt?: Date;
}

export type StatisticDocument = Statistic & Document;
export const StatisticSchema = SchemaFactory.createForClass(Statistic);
