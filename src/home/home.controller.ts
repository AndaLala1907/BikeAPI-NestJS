import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { HomeService } from './home.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    email: string;
    role: string;
  };
}

@ApiTags('Home')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('landing')
  getLandingPage() {
    return {
      title: 'Track your ride. Know your journey.',
      subtitle: 'Great app for city commuting!',
      callToAction: 'Log in or Get Started to begin your ride!',
    };
  }

  @Get('overview')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getDashboard(@Req() req: AuthenticatedRequest) {
    return this.homeService.getDashboardOverview(req.user.sub);
  }
}
