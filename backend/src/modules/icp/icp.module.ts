import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ICP } from './icp.entity';
import { ICPController } from './icp.controller';
import { ICPService } from './icp.service';
import { Tenant } from '../tenant/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ICP, Tenant])],
  controllers: [ICPController],
  providers: [ICPService],
})
export class ICPModule {}
