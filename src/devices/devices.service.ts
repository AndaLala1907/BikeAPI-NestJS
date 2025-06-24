import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from './schemas/device.schema';
import { CreateDeviceDto } from './dto/create-device.dto';
// service for device operations (CRUD+soft delete)
@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}
  // create a new device
  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const createdDevice = new this.deviceModel(createDeviceDto);
    return createdDevice.save();
  }
  // get all devices that are not soft deleted
  async findAll(): Promise<Device[]> {
    return this.deviceModel.find({ deletedAt: null });
  }
  // get one device by ID
  async findOne(id: string): Promise<Device> {
    const device = await this.deviceModel.findOne({ _id: id, deletedAt: null });
    if (!device) throw new NotFoundException('Device with ID ${id}not found');
    return device;
  }
  // update device
  async update(
    id: string,
    updateDeviceDto: CreateDeviceDto,
  ): Promise<Device | null> {
    return this.deviceModel.findByIdAndUpdate(id, updateDeviceDto, {
      new: true,
    });
  }
  // soft delete a device
  async delete(id: string): Promise<Device | null> {
    return this.deviceModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true },
    );
  }
}
