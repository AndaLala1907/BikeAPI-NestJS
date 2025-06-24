import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoadType, RoadTypeDocument } from './schemas/roadtype.schema';
import { CreateRoadTypeDto } from './dto/create-roadtype.dto';
// Main service for managing road types
@Injectable()
export class RoadTypesService {
  constructor(
    @InjectModel(RoadType.name)
    private roadTypeModel: Model<RoadTypeDocument>,
  ) {}
  //  create a new road type
  async create(dto: CreateRoadTypeDto): Promise<RoadType> {
    return this.roadTypeModel.create(dto);
  }
  // get all road types
  async findAll(): Promise<RoadType[]> {
    return this.roadTypeModel.find({ deletedAt: null });
  }

  // Get road type by ID
  async findOne(id: string): Promise<RoadType> {
    const roadType = await this.roadTypeModel.findOne({
      _id: id,
      deletedAt: null,
    });
    if (!roadType) throw new NotFoundException('Road type not found');
    return roadType;
  }

  // Soft delete a road type by setting deletedAt
  async delete(id: string): Promise<RoadType> {
    const roadType = await this.roadTypeModel.findById(id);
    if (!roadType || roadType.deletedAt) {
      throw new NotFoundException('Road type not found or already deleted');
    }

    roadType.deletedAt = new Date();
    return roadType.save();
  }
}
