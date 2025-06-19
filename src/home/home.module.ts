import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Journey, JourneySchema } from '../journeys/schemas/journey.schema';
import { Bike, BikeSchema } from '../bikes/schemas/bike.schema';
import { Device, DeviceSchema } from '../devices/schemas/device.schema';
import {
  Statistic,
  StatisticSchema,
} from '../statistics/schema/statistics.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Journey.name, schema: JourneySchema },
      { name: Bike.name, schema: BikeSchema },
      { name: Device.name, schema: DeviceSchema },
      { name: Statistic.name, schema: StatisticSchema },
    ]),
    UsersModule,
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
