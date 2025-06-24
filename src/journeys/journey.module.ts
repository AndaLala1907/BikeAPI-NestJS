import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Journey, JourneySchema } from './schemas/journey.schema';
import { JourneyService } from './journey.service';
import { JourneyController } from './journey.controller';

import { Device, DeviceSchema } from '../devices/schemas/device.schema';
import { Bike, BikeSchema } from '../bikes/schemas/bike.schema';
// module for managing journeys, with access to bikes and devices
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Journey.name, schema: JourneySchema },
      { name: Device.name, schema: DeviceSchema },
      { name: Bike.name, schema: BikeSchema },
    ]),
  ],
  controllers: [JourneyController],
  providers: [JourneyService],
})
export class JourneyModule {}
