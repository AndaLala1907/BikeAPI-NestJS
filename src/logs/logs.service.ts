import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './schemas/log.schema';
import { CreateLogDto } from './dto/create-log.dto';
import { NotFoundException } from '@nestjs/common';
// service for managing journey logs (start,stop,ping) with soft delete
@Injectable()
export class LogsService {
  constructor(
    @InjectModel(Log.name) private readonly logModel: Model<LogDocument>,
  ) {}
  // create a new log and assign the user who triggered it
  async create(createLogDto: CreateLogDto, userId: string): Promise<Log> {
    const newLog = new this.logModel({
      ...createLogDto,
      user_id: userId,
    });

    return newLog.save();
  }
  // get all logs created by the curent user
  async findAll(userId: string): Promise<Log[]> {
    return this.logModel.find({ user_id: userId, deletedAt: null }).exec();
  }
  // soft delete a log (sets deletedAt)
  async softDelete(id: string, userId: string): Promise<Log> {
    const log = await this.logModel.findOne({ _id: id, user_id: userId });

    if (!log) {
      throw new Error('Log not found or not owned by user');
    }

    log.deletedAt = new Date();
    return log.save();
  }
  // get a specific log by ID only if it belongs to the user
  async findOne(id: string, userId: string): Promise<Log> {
    const log = await this.logModel.findOne({
      _id: id,
      user_id: userId,
      deletedAt: null,
    });

    if (!log) {
      throw new NotFoundException('Log not found or access denied');
    }

    return log;
  }
}
