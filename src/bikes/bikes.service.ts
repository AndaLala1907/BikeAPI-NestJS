import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bike, BikeDocument } from './schemas/bike.schema';
import { CreateBikeDto } from './dto/create-bike.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateBikeDto } from './dto/update-bike.dto';

@Injectable()
export class BikesService {
  constructor(@InjectModel(Bike.name) private bikeModel: Model<BikeDocument>) {}

  async create(createBikeDto: CreateBikeDto): Promise<Bike> {
    const newBike = new this.bikeModel(createBikeDto);
    return newBike.save();
  }

  async findAll(): Promise<Bike[]> {
    return this.bikeModel.find().exec();
  }
  async findOne(id: string): Promise<Bike> {
    const bike = await this.bikeModel.findOne({ _id: id, deletedAt: null });
    if (!bike) throw new NotFoundException('Bike not found');
    return bike;
  }
  async update(id: string, updateBikeDto: UpdateBikeDto): Promise<Bike> {
    const bike = await this.bikeModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      updateBikeDto,
      { new: true },
    );
    if (!bike) throw new NotFoundException('Bike not found');
    return bike;
  }
  async remove(id: string): Promise<Bike> {
    const bike = await this.bikeModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true },
    );
    if (!bike) throw new NotFoundException('Bike not found');
    return bike;
  }
}
