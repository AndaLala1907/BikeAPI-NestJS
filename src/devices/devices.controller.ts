import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';

@UseGuards(JwtAuthGuard)
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.delete(id);
  }
}
