import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TenantModule } from './modules/tenant/tenant.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ICPModule } from './modules/icp/icp.module';
import { EnrichmentModule } from './modules/enrichment/enrichment.module';
import { ScoringModule } from './modules/scoring/scoring.module';
import { LeadsModule } from './modules/leads/leads.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'aiuser',
      password: 'ai_password_change_me',
      database: 'aileads',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TenantModule,
    UserModule,
    AuthModule,
    AnalyticsModule,
    ICPModule,
    EnrichmentModule,
    ScoringModule,
    LeadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
