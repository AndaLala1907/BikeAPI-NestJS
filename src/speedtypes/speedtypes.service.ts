// src/speedtypes/speedtypes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SpeedType, SpeedTypeDocument } from './schemas/speedtype.schema';
import { CreateSpeedTypeDto } from './dto/create-speedtype.dto';

@Injectable()
export class SpeedTypesService {
  constructor(
    @InjectModel(SpeedType.name)
    private speedTypeModel: Model<SpeedTypeDocument>,
  ) {}

  async create(dto: CreateSpeedTypeDto): Promise<SpeedType> {
    return this.speedTypeModel.create(dto);
  }

  async findAll(): Promise<SpeedType[]> {
    return this.speedTypeModel.find();
  }

  async findOne(id: string): Promise<SpeedType> {
    const speedType = await this.speedTypeModel.findById(id);
    if (!speedType) throw new NotFoundException('Speed type not found');
    return speedType;
  }

  async delete(id: string): Promise<void> {
    const result = await this.speedTypeModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Speed type not found');
  }
}
