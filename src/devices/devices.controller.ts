import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
// controller for managing devices (pair/unpair logic)
@ApiTags('Devices')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  // POST/devices
  // create and optioanlly pair a new device
  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }
  // GET/devices
  //  Get all devices
  @Get()
  findAll() {
    return this.devicesService.findAll();
  }
  // GET/devices/:id
  // get single device by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(id);
  }
  // DELETE /devices/:id
  // soft delete device by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.delete(id);
  }
}
