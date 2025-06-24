import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bike, BikeDocument } from './schemas/bike.schema';
import { CreateBikeDto } from './dto/create-bike.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateBikeDto } from './dto/update-bike.dto';
// service for bike operations (create, find, update, soft delete)
@Injectable()
export class BikesService {
  constructor(@InjectModel(Bike.name) private bikeModel: Model<BikeDocument>) {}
  // create a new bike
  async create(createBikeDto: CreateBikeDto): Promise<Bike> {
    const newBike = new this.bikeModel(createBikeDto);
    return newBike.save();
  }
  // get all bikes including soft-deleted if not filtered
  async findAll(): Promise<Bike[]> {
    return this.bikeModel.find({ deletedAt: null });
  }
  //get one bike by ID that must not be deleted
  async findOne(id: string): Promise<Bike> {
    const bike = await this.bikeModel.findOne({ _id: id, deletedAt: null });
    if (!bike) throw new NotFoundException('Bike not found');
    return bike;
  }
  // update bike if it exists and is not soft deleted
  async update(id: string, updateBikeDto: UpdateBikeDto): Promise<Bike> {
    const bike = await this.bikeModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      updateBikeDto,
      { new: true },
    );
    if (!bike) throw new NotFoundException('Bike not found');
    return bike;
  }
  // soft delete bike by setting deletedAt
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
