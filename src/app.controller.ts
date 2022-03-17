import { Controller, Get, Request, Post, UseGuards, Response, HttpStatus, Body, Header, Injectable } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  static ID:string;

  @Header('Access-Control-Allow-Credentials', 'true')
  @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
  @Header('Access-Control-Allow-Origin', 'http://localhost:8000')

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any, @Response() res) {
    const response = await this.authService.login(req.user);

    res.cookie('token', response.access_token, {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: 60*60*1000,
      
    });

    res.status(HttpStatus.OK).json({
      message: 'Login successful',
      _id:response.id,
      token:response.access_token
    });
    return req.user
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('users')
  // getProfile(@Request() req: any) {
  //   return req.user;
  // }
}
