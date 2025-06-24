import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Journey, JourneyDocument } from './schemas/journey.schema';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { Bike, BikeDocument } from '../bikes/schemas/bike.schema';
import { Device, DeviceDocument } from '../devices/schemas/device.schema';
// service for managing journey logic: create, end, ping, delete
@Injectable()
export class JourneyService {
  constructor(
    @InjectModel(Journey.name) private journeyModel: Model<JourneyDocument>,
    @InjectModel(Bike.name) private bikeModel: Model<BikeDocument>,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}
  // create a journey and calculate calories if start/end time is set
  async create(createJourneyDto: CreateJourneyDto): Promise<Journey> {
    const { user_id, bike_id, device_id, startTime, endTime } =
      createJourneyDto;

    const bike = await this.bikeModel.findById(bike_id);
    if (!bike) throw new NotFoundException('Bike not found');

    const device = await this.deviceModel.findById(device_id);
    if (!device) throw new NotFoundException('Device not found');

    const start = startTime || new Date();
    const caloriesBurned = this.calculateCalories(startTime, endTime);

    const journey = new this.journeyModel({
      user_id,
      bike_id,
      device_id,
      bike_barcode: bike.barcode,
      bike_type: bike.type,
      bike_weight: bike.weight,
      speedType_id: bike.speedType,
      roadType_id: bike.roadType,
      device_barcode: device.barcode,
      startTime: start,
      endTime,
      caloriesBurned,
    });

    return journey.save();
  }
  // calculate calories based on time difference
  private calculateCalories(start?: Date, end?: Date): number {
    if (!start || !end) return 0;
    const minutes = Math.floor(
      (new Date(end).getTime() - new Date(start).getTime()) / 60000,
    );
    return Math.max(0, minutes * 7);
  }
  // get all journeys
  async findAll(): Promise<Journey[]> {
    return this.journeyModel.find({ deletedAt: { $exists: false } });
  }
  // get journey by ID
  async findById(id: string): Promise<Journey> {
    const journey = await this.journeyModel.findOne({
      _id: id,
      deletedAt: { $exists: false },
    });
    if (!journey) throw new NotFoundException('Journey not found');
    return journey;
  }
  // soft delete journey by setting deletedAt
  async delete(id: string): Promise<Journey> {
    const journey = await this.journeyModel.findById(id);
    if (!journey) throw new NotFoundException('Journey not found');

    journey.deletedAt = new Date();
    return journey.save();
  }
  // Update calories in real-time (ping) based on time from start
  async pingCalories(id: string): Promise<Journey> {
    const journey = await this.journeyModel.findById(id);
    if (!journey) throw new NotFoundException('Journey not found');

    const now = new Date();
    const minutes = Math.floor(
      (now.getTime() - new Date(journey.startTime).getTime()) / 60000,
    );
    const calories = Math.max(0, minutes * 7);

    journey.caloriesBurned = calories;
    return journey.save();
  }
  // End journey by setting endTime and calculating final calories
  async endJourney(id: string, endTime: string): Promise<Journey> {
    const journey = await this.journeyModel.findById(id);
    if (!journey) throw new NotFoundException('Journey not found');

    const end = new Date(endTime);
    const calories = this.calculateCalories(journey.startTime, end);

    journey.endTime = end;
    journey.caloriesBurned = calories;
    return journey.save();
  }
}
