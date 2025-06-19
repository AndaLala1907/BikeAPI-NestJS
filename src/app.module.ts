import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BikesModule } from './bikes/bikes.module';
import { DevicesModule } from './devices/devices.module';
import { JourneyModule } from './journeys/journey.module';
import { LogsModule } from './logs/logs.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { RoadTypesModule } from './roadtypes/roadtypes.module';
import { SpeedTypesModule } from './speedtypes/speedtypes.module';
import { StatisticsModule } from './statistics/statistics.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    UsersModule,
    AuthModule,
    BikesModule,
    DevicesModule,
    JourneyModule,
    LogsModule,
    WebhooksModule,
    RoadTypesModule,
    SpeedTypesModule,
    StatisticsModule,
    HomeModule,
  ],
})
export class AppModule {}
