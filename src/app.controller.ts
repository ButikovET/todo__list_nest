import {
  Controller,
  Request,
  Post,
  UseGuards,
  Response,
  HttpStatus,
  Header,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  static ID: string;

  @Header('Access-Control-Allow-Credentials', 'true')
  @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
  @Header('Access-Control-Allow-Origin', 'http://localhost:8000')
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any, @Response() res) {
    const response = await this.authService.login(req.user);
    res.cookie('token', response.access_token, {
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 1000,
    });

    res.status(HttpStatus.OK).json({
      message: 'Login successful',
      name:response.name,
      photo: req.user.photo,
      croppedPhoto: req.user.croppedPhoto
    });
    return req.user;
  }

  @Post('logout')
  async logout(@Request() req: any, @Response() res) {
    res.cookie('token', ' ', {
      httpOnly: true,
      sameSite: 'Lax',
    });

    res.status(HttpStatus.OK).json({
      message: 'LogOut successful',
    });
    return req.user;
  }
}
