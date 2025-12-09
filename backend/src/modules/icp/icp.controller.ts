import { Controller, Get, Put, Body } from '@nestjs/common';
import { ICPService } from './icp.service';

@Controller('icp')
export class ICPController {
  constructor(private readonly icpService: ICPService) {}

  @Get()
  async getICP() {
    return this.icpService.getICP();
  }

  @Put()
  async updateICP(@Body() data: any) {
    return this.icpService.updateICP(data);
  }
}
