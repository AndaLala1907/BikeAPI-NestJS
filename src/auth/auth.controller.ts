import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
// Controller for authentication (register/login)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST/auth/register
  // register a new user
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  // login user and return JWT token
  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    // if creddentials are invalid return 401
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return token;
  }
}
