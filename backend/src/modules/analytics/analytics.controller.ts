import { Controller, Get } from '@nestjs/common';

@Controller('analytics')
export class AnalyticsController {
  @Get('summary')
  getSummary() {
    return {
      totalLeads: 0,
      activeCampaigns: 0,
      repliesLast7Days: 0,
      meetingsBookedLast7Days: 0,
      conversionRate: 0,
    };
  }
}
