import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from './schemas/device.schema';
import { CreateDeviceDto } from './dto/create-device.dto';
@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const createdDevice = new this.deviceModel(createDeviceDto);
    return createdDevice.save();
  }

  async findAll(): Promise<Device[]> {
    return this.deviceModel.find({ deletedAt: null });
  }

  async findOne(id: string): Promise<Device | null> {
    return this.deviceModel.findById(id);
  }

  async update(
    id: string,
    updateDeviceDto: CreateDeviceDto,
  ): Promise<Device | null> {
    return this.deviceModel.findByIdAndUpdate(id, updateDeviceDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<Device | null> {
    return this.deviceModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true },
    );
  }
}
