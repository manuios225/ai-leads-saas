import { Controller, Get, Post, Body } from '@nestjs/common';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  async getAll() {
    return this.leadsService.getAllLeads();
  }

  @Post()
  async create(@Body() data: any) {
    return this.leadsService.createLead(data);
  }
}
