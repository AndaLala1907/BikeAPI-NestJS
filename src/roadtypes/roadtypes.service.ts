// src/roadtypes/roadtypes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoadType, RoadTypeDocument } from './schemas/roadtype.schema';
import { CreateRoadTypeDto } from './dto/create-roadtype.dto';

@Injectable()
export class RoadTypesService {
  constructor(
    @InjectModel(RoadType.name)
    private roadTypeModel: Model<RoadTypeDocument>,
  ) {}

  async create(dto: CreateRoadTypeDto): Promise<RoadType> {
    return this.roadTypeModel.create(dto);
  }

  async findAll(): Promise<RoadType[]> {
    return this.roadTypeModel.find();
  }

  async findOne(id: string): Promise<RoadType> {
    const roadType = await this.roadTypeModel.findById(id);
    if (!roadType) throw new NotFoundException('Road type not found');
    return roadType;
  }

  async delete(id: string): Promise<void> {
    const result = await this.roadTypeModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Road type not found');
  }
}
