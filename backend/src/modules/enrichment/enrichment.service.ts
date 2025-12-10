import { Injectable } from '@nestjs/common';

@Injectable()
export class EnrichmentService {
  async enrichLead(raw: any) {
    const enriched = {
      ...raw,
      enriched: true,
      email: raw.email || `${raw.fullName.replace(/\s+/g, '.').toLowerCase()}@example.com`,
      company: raw.company || "Unknown Inc",
      jobTitle: raw.jobTitle || "Unknown",
      linkedinUrl: raw.linkedinUrl || "https://linkedin.com/in/unknown",
      phone: raw.phone || "+00000000000",
      score: Math.floor(Math.random() * 100),
    };
    return enriched;
  }
}
