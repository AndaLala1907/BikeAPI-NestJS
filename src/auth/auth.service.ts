import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, ...rest } = registerDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      ...rest,
      email,
      password: hashedPassword,
    });

    return await user.save(); // ❗ Kthe vetëm user-in e regjistruar, pa token
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user._id.toString(),
      role: user.role,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
