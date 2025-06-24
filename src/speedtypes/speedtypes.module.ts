import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpeedTypesService } from './speedtypes.service';
import { SpeedTypesController } from './speedtypes.controller';
import { SpeedType, SpeedTypeSchema } from './schemas/speedtype.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SpeedType.name, schema: SpeedTypeSchema },
    ]),
  ],
  controllers: [SpeedTypesController],
  providers: [SpeedTypesService],
  exports: [SpeedTypesService],
})
// module for managing speed types
export class SpeedTypesModule {}
