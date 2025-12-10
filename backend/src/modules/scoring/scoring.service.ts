import { Injectable } from '@nestjs/common';
import { Lead } from '../leads/lead.entity';

@Injectable()
export class ScoringService {
  computeScore(lead: Partial<Lead>): number {
    let score = 30;

    const seniorTitles = ['cto', 'ceo', 'founder', 'co-founder', 'vp', 'chief', 'head of'];

    if (lead.jobTitle) {
      const jt = lead.jobTitle.toLowerCase();
      if (seniorTitles.some(t => jt.includes(t))) {
        score += 30;
      } else if (jt.includes('manager') || jt.includes('lead')) {
        score += 15;
      }
    }

    if (lead.company) {
      const c = lead.company.toLowerCase();
      if (c.includes('saas') || c.includes('software')) {
        score += 15;
      }
      if (c.includes('agency')) {
        score += 5;
      }
    }

    if (lead.email) {
      const email = lead.email.toLowerCase();
      if (email.endsWith('.io') || email.endsWith('.ai')) {
        score += 10;
      }
      if (email.includes('+')) {
        score += 5;
      }
    }

    if (lead.linkedinUrl) {
      score += 5;
    }

    if (lead.status && lead.status.toLowerCase() === 'replied') {
      score += 20;
    }

    if (score < 0) score = 0;
    if (score > 100) score = 100;

    return Math.round(score);
  }
}
