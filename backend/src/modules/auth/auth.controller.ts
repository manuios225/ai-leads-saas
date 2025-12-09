import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

class SeedSuperAdminDto {
  email: string;
  password: string;
}

class ResetSuperAdminDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post('seed-superadmin')
  seedSuperAdmin(@Body() body: SeedSuperAdminDto) {
    return this.authService.seedSuperAdmin(body.email, body.password);
  }

  @Post('reset-superadmin')
  resetSuperAdmin(@Body() body: ResetSuperAdminDto) {
    return this.authService.resetSuperAdmin(body.email, body.password);
  }

  @Get('debug-users')
  debugUsers() {
    return this.authService.getAllUsers();
  }
}
