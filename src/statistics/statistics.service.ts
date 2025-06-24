import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Statistic, StatisticDocument } from './schema/statistics.schema';
import { Journey, JourneyDocument } from '../journeys/schemas/journey.schema';
import { UpdateStatisticDto } from './dto/update-statistic.dto';

@Injectable()
// service for handling logic related to user statistics
export class StatisticsService {
  constructor(
    @InjectModel(Statistic.name)
    private readonly statisticModel: Model<StatisticDocument>,
    @InjectModel(Journey.name)
    private readonly journeyModel: Model<JourneyDocument>,
  ) {}
  // generate a statistic from all completed journeys of a user
  async createFromJourneys(userId: string): Promise<Statistic> {
    const journeys = await this.journeyModel.find({
      user_id: userId,
      endTime: { $exists: true },
      deletedAt: { $exists: false },
    });

    if (journeys.length === 0) {
      throw new NotFoundException('No completed journeys found for this user.');
    }
    // calculate total duration in minutes
    const duration = journeys.reduce((sum, j) => {
      if (!j.startTime || !j.endTime) return sum;
      return (
        sum +
        Math.floor(
          (new Date(j.endTime).getTime() - new Date(j.startTime).getTime()) /
            60000,
        )
      );
    }, 0);
    // total calories burned
    const calories = journeys.reduce(
      (sum, j) => sum + (j.caloriesBurned || 0),
      0,
    );
    // estimated average speed and total distance
    const avg_speed = 15;
    const distance = (avg_speed / 60) * duration;

    const newStat = new this.statisticModel({
      user_id: userId,
      duration,
      calories,
      distance: parseFloat(distance.toFixed(2)),
      avg_speed,
    });

    return await newStat.save();
  }
  // get all statistics, not deleted
  async findAll(): Promise<Statistic[]> {
    return this.statisticModel
      .find({ deletedAt: { $exists: false } })
      .populate('user_id')
      .exec();
  }
  // get statistic by id, not deleted
  async findOne(id: string): Promise<Statistic> {
    const stat = await this.statisticModel
      .findOne({ _id: id, deletedAt: { $exists: false } })
      .populate('user_id');
    if (!stat) throw new NotFoundException('Statistic not found');
    return stat;
  }
  // get all statistics for a specific user
  async findByUserId(userId: string): Promise<Statistic[]> {
    return this.statisticModel
      .find({ user_id: userId, deletedAt: { $exists: false } })
      .exec();
  }
  // update statistic by ID, not deleted
  async update(id: string, dto: UpdateStatisticDto): Promise<Statistic> {
    const updated = await this.statisticModel.findOneAndUpdate(
      { _id: id, deletedAt: { $exists: false } },
      dto,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Statistic not found');
    return updated;
  }
  // soft delete statistic by setting deletedAt
  async remove(id: string): Promise<Statistic> {
    const stat = await this.statisticModel.findById(id);
    if (!stat) throw new NotFoundException('Statistic not found');

    stat.deletedAt = new Date();
    return stat.save();
  }
}
