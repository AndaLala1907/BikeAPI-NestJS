import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GenerateStatisticsDto } from './dto/generate-statistics.dto';

@ApiTags('Statistics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('statistics')
// controller to manage user statistics auto-generated from journeys
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  // generate statistics form all journeys of a user
  @Post()
  @ApiOperation({ summary: 'Generate statistic from user journeys' })
  createFromUser(@Body() dto: GenerateStatisticsDto) {
    return this.statisticsService.createFromJourneys(dto.user_id);
  }
  // get all statistics
  @Get()
  @ApiOperation({ summary: 'Get all statistics' })
  findAll() {
    return this.statisticsService.findAll();
  }
  // get one statistic by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get statistic by ID' })
  findOne(@Param('id') id: string) {
    return this.statisticsService.findOne(id);
  }
  // get all statistics for a specific user
  @Get('/user/:userId')
  @ApiOperation({ summary: 'Get statistics by user ID' })
  getUserStats(@Param('userId') userId: string) {
    return this.statisticsService.findByUserId(userId);
  }
  // update a statistic
  @Put(':id')
  @ApiOperation({ summary: 'Update statistic by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateStatisticDto) {
    return this.statisticsService.update(id, dto);
  }
  // soft delete
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete statistic by ID' })
  remove(@Param('id') id: string) {
    return this.statisticsService.remove(id);
  }
}
