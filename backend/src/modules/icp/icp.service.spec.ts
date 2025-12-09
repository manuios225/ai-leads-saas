import { Test, TestingModule } from '@nestjs/testing';
import { IcpService } from './icp.service';

describe('IcpService', () => {
  let service: IcpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IcpService],
    }).compile();

    service = module.get<IcpService>(IcpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
