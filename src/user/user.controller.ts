import { Controller, Get, Body, Patch, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)//bu kodu çöz
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.userService.update(req.user.id, updateUserDto);
  }
}
