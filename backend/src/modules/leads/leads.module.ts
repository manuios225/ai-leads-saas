import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './lead.entity';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { Tenant } from '../tenant/tenant.entity';
import { EnrichmentModule } from '../enrichment/enrichment.module';
import { ScoringModule } from '../scoring/scoring.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lead, Tenant]),
    EnrichmentModule,
    ScoringModule,
  ],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
