import { Test, TestingModule } from '@nestjs/testing';
import { IcpController } from './icp.controller';

describe('IcpController', () => {
  let controller: IcpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IcpController],
    }).compile();

    controller = module.get<IcpController>(IcpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
