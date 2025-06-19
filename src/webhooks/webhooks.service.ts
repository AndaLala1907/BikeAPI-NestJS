import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from '../logs/schemas/log.schema';
import { StartDto } from './dto/start.dto';
import { PingDto } from './dto/ping.dto';
import { StopDto } from './dto/stop.dto';

@Injectable()
export class WebhooksService {
  constructor(
    @InjectModel(Log.name) private readonly logModel: Model<LogDocument>,
  ) {}

  async start(dto: StartDto) {
    const log = new this.logModel({
      user_id: dto.user_id,
      journey_id: dto.journey_id,
      coordinates: [[dto.latitude, dto.longitude]],
      ended: false,
      type: 'start',
    });

    return log.save();
  }

  async ping(dto: PingDto) {
    const log = await this.logModel.findById(dto.log_id);
    if (!log) throw new NotFoundException('Log not found');

    if (!Array.isArray(log.coordinates)) {
      log.coordinates = [];
    }

    if (!log.user_id) log.user_id = dto.user_id;
    if (!log.journey_id) log.journey_id = dto.journey_id;

    log.coordinates.push([dto.latitude, dto.longitude]);
    log.type = 'ping';

    return log.save();
  }

  async stop(dto: StopDto) {
    const log = await this.logModel.findById(dto.log_id);
    if (!log) throw new NotFoundException('Log not found');

    if (!Array.isArray(log.coordinates)) {
      log.coordinates = [];
    }

    if (!log.user_id) log.user_id = dto.user_id;

    log.coordinates.push([dto.latitude, dto.longitude]);
    log.ended = true;
    log.type = 'stop';

    return log.save();
  }
}
