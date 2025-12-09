import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(email: string, password: string): Promise<{ id: string; email: string }> {
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('Email already in use');
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashed, role: 'USER' });
    const saved = await this.userRepository.save(user);
    return { id: saved.id, email: saved.email };
  }

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }

  async seedSuperAdmin(email: string, password: string): Promise<{ id: string; email: string; role: string }> {
    const existingSuperAdmin = await this.userRepository.findOne({ where: { role: 'SUPER_ADMIN' } });
    if (existingSuperAdmin) {
      throw new BadRequestException('Super admin already exists');
    }
    const existingByEmail = await this.userRepository.findOne({ where: { email } });
    if (existingByEmail) {
      throw new ConflictException('Email already in use');
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashed, role: 'SUPER_ADMIN' });
    const saved = await this.userRepository.save(user);
    return { id: saved.id, email: saved.email, role: saved.role };
  }

  async resetSuperAdmin(email: string, password: string): Promise<{ id: string; email: string; role: string }> {
    const hashed = await bcrypt.hash(password, 10);
    let user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      user.password = hashed;
      user.role = 'SUPER_ADMIN';
      user = await this.userRepository.save(user);
      return { id: user.id, email: user.email, role: user.role };
    }
    const created = this.userRepository.create({ email, password: hashed, role: 'SUPER_ADMIN' });
    const saved = await this.userRepository.save(created);
    return { id: saved.id, email: saved.email, role: saved.role };
  }

  async getAllUsers(): Promise<{ id: string; email: string; role: string }[]> {
    const users = await this.userRepository.find();
    return users.map((u) => ({
      id: u.id,
      email: u.email,
      role: u.role,
    }));
  }
}
