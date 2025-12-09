import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead } from './lead.entity';
import { Repository } from 'typeorm';
import { Tenant } from '../tenant/tenant.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadsRepo: Repository<Lead>,
    @InjectRepository(Tenant)
    private tenantRepo: Repository<Tenant>,
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

    const lead = this.leadsRepo.create({
      ...data,
      tenant,
    });

    return this.leadsRepo.save(lead);
  }
}
