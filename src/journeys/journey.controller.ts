import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JourneyService } from './journey.service';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { EndJourneyDto } from './dto/end-journey.dto';
// controller for managing journeys (start, end, ping, delete)
@ApiTags('Journeys')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('journeys')
export class JourneyController {
  constructor(private readonly journeyService: JourneyService) {}
  // PUT/journeys/ping/:id
  // update calories for active journey
  @Put('ping/:id')
  @ApiOperation({ summary: 'Ping to update calories on an active journey' })
  @ApiResponse({ status: 200, description: 'Calories updated successfully' })
  @ApiResponse({
    status: 404,
    description: 'Journey not found or already ended',
  })
  ping(@Param('id') id: string) {
    return this.journeyService.pingCalories(id);
  }
  // POST/journeys
  // start a new journey
  @Post()
  @ApiOperation({ summary: 'Start a new journey' })
  @ApiResponse({ status: 201, description: 'Journey started successfully' })
  @ApiResponse({
    status: 400,
    description: 'Invalid data or user/bike not found',
  })
  create(@Body() dto: CreateJourneyDto) {
    return this.journeyService.create(dto);
  }
  // GET/journeys
  // list all journeys
  @Get()
  @ApiOperation({ summary: 'Get all journeys' })
  @ApiResponse({ status: 200, description: 'List of journeys returned' })
  findAll() {
    return this.journeyService.findAll();
  }
  // GET/journeys/:id
  //Get journey by Id
  @Get(':id')
  @ApiOperation({ summary: 'Get journey by ID' })
  @ApiResponse({ status: 200, description: 'Journey found' })
  @ApiResponse({ status: 404, description: 'Journey not found' })
  findById(@Param('id') id: string) {
    return this.journeyService.findById(id);
  }
  // DELETE/journeys/:id
  // soft delete a journey
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a journey by ID' })
  @ApiResponse({ status: 200, description: 'Journey deleted' })
  @ApiResponse({ status: 404, description: 'Journey not found' })
  delete(@Param('id') id: string) {
    return this.journeyService.delete(id);
  }
  // PATCH/journeys/:id/end
  // end journey by setting endTime and calculating final calories
  @Patch(':id/end')
  @ApiOperation({ summary: 'End an ongoing journey' })
  @ApiResponse({ status: 200, description: 'Journey ended successfully' })
  @ApiResponse({
    status: 404,
    description: 'Journey not found or already ended',
  })
  endJourney(@Param('id') id: string, @Body() body: EndJourneyDto) {
    const endTime: string = body.endTime;
    if (!endTime) {
      throw new BadRequestException('endTime is required');
    }
    return this.journeyService.endJourney(id, endTime);
  }
}
