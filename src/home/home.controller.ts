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
// controller for public landing and authenticated dashboard
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
  // public GET endpoint (unauthenticated)
  @Get('landing')
  getLandingPage() {
    return {
      title: 'Track your ride. Know your journey.',
      subtitle: 'Great app for city commuting!',
      callToAction: 'Log in or Get Started to begin your ride!',
    };
  }
  // Authenticated GET endpoint for user overview
  @Get('overview')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getDashboard(@Req() req: AuthenticatedRequest) {
    return this.homeService.getDashboardOverview(req.user.sub);
  }
}
