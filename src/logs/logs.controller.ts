import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { Param, Delete } from '@nestjs/common';

interface RequestWithUser extends Request {
  user: { sub: string };
}

@UseGuards(JwtAuthGuard)
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  create(@Body() createLogDto: CreateLogDto, @Req() req: RequestWithUser) {
    const userId = req.user.sub;
    return this.logsService.create(createLogDto, userId);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    const userId = req.user.sub;
    return this.logsService.findAll(userId);
  }
  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.sub;
    return this.logsService.softDelete(id, userId);
  }
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.sub;
    return this.logsService.findOne(id, userId);
  }
}
