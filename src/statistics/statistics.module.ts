import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { Statistic, StatisticSchema } from './schema/statistics.schema';
import { Journey, JourneySchema } from '../journeys/schemas/journey.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Statistic.name, schema: StatisticSchema },
      { name: Journey.name, schema: JourneySchema },
    ]),
  ],

  controllers: [StatisticsController],
  providers: [StatisticsService],
})
// module to manage statistics logic and routes
export class StatisticsModule {}
