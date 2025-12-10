import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead } from './lead.entity';
import { Repository } from 'typeorm';
import { Tenant } from '../tenant/tenant.entity';
import { EnrichmentService } from '../enrichment/enrichment.service';
import { ScoringService } from '../scoring/scoring.service';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadsRepo: Repository<Lead>,
    @InjectRepository(Tenant)
    private tenantRepo: Repository<Tenant>,
    private enrichmentService: EnrichmentService,
    private scoringService: ScoringService,
  ) {}

  async getOrCreateTenant() {
    let tenant = await this.tenantRepo.findOne({
      where: { name: 'Default Tenant' },
    });

    if (!tenant) {
      tenant = this.tenantRepo.create({ name: 'Default Tenant' });
      await this.tenantRepo.save(tenant);
    }

    return tenant;
  }

  async getAllLeads() {
    const tenant = await this.getOrCreateTenant();
    return this.leadsRepo.find({
      where: { tenant },
      order: { fullName: 'ASC' },
    });
  }

  async createLead(data: Partial<Lead>) {
    const tenant = await this.getOrCreateTenant();
    const enriched = await this.enrichmentService.enrichLead(data);
    const score = this.scoringService.computeScore(enriched);

    const lead = this.leadsRepo.create({
      ...enriched,
      score,
      tenant,
    });

    return this.leadsRepo.save(lead);
  }

  async rescoreAllLeads() {
    const tenant = await this.getOrCreateTenant();
    const leads = await this.leadsRepo.find({ where: { tenant } });

    for (const lead of leads) {
      const newScore = this.scoringService.computeScore(lead);
      lead.score = newScore;
      await this.leadsRepo.save(lead);
    }

    return this.getAllLeads();
  }
}
