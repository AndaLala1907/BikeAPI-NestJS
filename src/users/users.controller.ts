import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Put,
  Patch,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
// controller for managing users (admin-only access)
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // GET/users
  // returns all users(admin only)
  @Roles('admin')
  @Get()
  @ApiOperation({ summary: 'Get all users (admin only)' })
  @ApiResponse({ status: 200, description: 'List of users returned' })
  @ApiResponse({ status: 403, description: 'Forbidden – not an admin' })
  findAll() {
    return this.usersService.findAll();
  }
  // DELETE/users/:id
  // Soft delete a user by ID(admin only)
  @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
  // PUT?/USERS/:ID
  // FULLY updates a user by ID
  @Roles('admin')
  @Put(':id')
  @ApiOperation({ summary: 'Update user data completely' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data or ID' })
  updatePut(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }
  // PATCH/users/:id
  // partitally updates a user by ID
  @Roles('admin')
  @Patch(':id')
  @ApiOperation({ summary: 'Partially update user data' })
  @ApiResponse({ status: 200, description: 'User partially updated' })
  @ApiResponse({ status: 400, description: 'Invalid patch data or ID' })
  updatePatch(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }
}
