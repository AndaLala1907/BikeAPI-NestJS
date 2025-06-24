import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

interface RequestWithUser extends Request {
  user: { sub: string };
}
// controller for managing journey logs (start/stop/ping)
@ApiTags('Logs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}
  // create a log for a journey (start, stop, ping)
  @Post()
  create(@Body() createLogDto: CreateLogDto, @Req() req: RequestWithUser) {
    const userId = req.user.sub;
    return this.logsService.create(createLogDto, userId);
  }
  // get all logs for current user
  @Get()
  findAll(@Req() req: RequestWithUser) {
    const userId = req.user.sub;
    return this.logsService.findAll(userId);
  }
  // get single log by ID
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.sub;
    return this.logsService.findOne(id, userId);
  }
  // soft delete a log
  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.sub;
    return this.logsService.softDelete(id, userId);
  }
}
