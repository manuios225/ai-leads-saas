import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Lead } from './lead.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EnrichmentService } from '../enrichment/enrichment.service';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private repo: Repository<Lead>,
    private enrichment: EnrichmentService,
  ) {}

  async createLead(data: any) {
    const enriched = await this.enrichment.enrichLead(data);
    const lead = this.repo.create(enriched);
    return this.repo.save(lead);
  }

  async getLeads() {
    return this.repo.find();
  }
}
