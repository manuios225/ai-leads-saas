import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICP } from './icp.entity';
import { Repository } from 'typeorm';
import { Tenant } from '../tenant/tenant.entity';

@Injectable()
export class ICPService {
  constructor(
    @InjectRepository(ICP)
    private icpRepository: Repository<ICP>,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  async getOrCreateTenant() {
    let tenant = await this.tenantRepository.findOne({
      where: { name: 'Default Tenant' },
    });

    if (!tenant) {
      tenant = this.tenantRepository.create({
        name: 'Default Tenant',
      });
      await this.tenantRepository.save(tenant);
    }

    return tenant;
  }

  async getICP() {
    const tenant = await this.getOrCreateTenant();
    return this.icpRepository.findOne({ where: { tenant } });
  }

  async updateICP(data: Partial<ICP>) {
    const tenant = await this.getOrCreateTenant();
    let icp = await this.getICP();

    if (!icp) {
      icp = this.icpRepository.create({ tenant });
    }

    Object.assign(icp, data);
    return this.icpRepository.save(icp);
  }
}
