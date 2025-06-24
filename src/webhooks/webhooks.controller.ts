import { Controller, Post, Body } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { StartDto } from './dto/start.dto';
import { PingDto } from './dto/ping.dto';
import { StopDto } from './dto/stop.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Webhooks')
@Controller('webhooks')
// controller to recieve device pings and control journey start/stop
export class WebhooksController {
  constructor(private readonly service: WebhooksService) {}
  // start journey and create a log entry
  @Post('start')
  @ApiOperation({ summary: 'Start journey and create a log' })
  start(@Body() dto: StartDto) {
    return this.service.start(dto);
  }
  // ping during journey to update log position
  @Post('ping')
  @ApiOperation({ summary: 'Ping log with new coordinates' })
  ping(@Body() dto: PingDto) {
    return this.service.ping(dto);
  }
  // stop journey and finalize the log
  @Post('stop')
  @ApiOperation({ summary: 'Stop journey and close the log' })
  stop(@Body() dto: StopDto) {
    return this.service.stop(dto);
  }
}
