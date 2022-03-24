import { Controller, Get, Post, Body, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Body() username: string) {
    return this.usersService.findByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateUsersDto: UpdateUsersDto) {
    return this.usersService.update(updateUsersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() updateUsersDto: UpdateUsersDto) {
    return this.usersService.remove(updateUsersDto);
  }
}
