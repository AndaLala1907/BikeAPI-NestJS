import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoadTypesService } from './roadtypes.service';
import { RoadTypesController } from './roadtypes.controller';
import { RoadType, RoadTypeSchema } from './schemas/roadtype.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoadType.name, schema: RoadTypeSchema },
    ]),
  ],
  controllers: [RoadTypesController],
  providers: [RoadTypesService],
  exports: [RoadTypesService],
})
export class RoadTypesModule {}
