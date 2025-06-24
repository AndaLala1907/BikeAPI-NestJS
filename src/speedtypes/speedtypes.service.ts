import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SpeedType, SpeedTypeDocument } from './schemas/speedtype.schema';
import { CreateSpeedTypeDto } from './dto/create-speedtype.dto';

@Injectable()
// service for managing speed types
export class SpeedTypesService {
  constructor(
    @InjectModel(SpeedType.name)
    private speedTypeModel: Model<SpeedTypeDocument>,
  ) {}
  // create new speed type
  async create(dto: CreateSpeedTypeDto): Promise<SpeedType> {
    return this.speedTypeModel.create(dto);
  }
  // get all speed type
  async findAll(): Promise<SpeedType[]> {
    return this.speedTypeModel.find({ deletedAt: null });
  }
  // get one speed type by id
  async findOne(id: string): Promise<SpeedType> {
    const speedType = await this.speedTypeModel.findOne({
      _id: id,
      deletedAt: null,
    });
    if (!speedType) throw new NotFoundException('Speed type not found');
    return speedType;
  }
  // soft delete speed type by setting deletedAt
  async delete(id: string): Promise<SpeedType> {
    const speedType = await this.speedTypeModel.findById(id);
    if (!speedType || speedType.deletedAt) {
      throw new NotFoundException('Speed type not found or already deleted');
    }
    speedType.deletedAt = new Date();
    return speedType.save();
  }
}
