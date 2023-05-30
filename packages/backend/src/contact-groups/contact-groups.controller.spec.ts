import { Test, TestingModule } from '@nestjs/testing';
import { ContactGroupsController } from './contact-groups.controller';
import { ContactGroupsService } from './contact-groups.service';

describe('ContactGroupsController', () => {
  let controller: ContactGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactGroupsController],
      providers: [ContactGroupsService],
    }).compile();

    controller = module.get<ContactGroupsController>(ContactGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
