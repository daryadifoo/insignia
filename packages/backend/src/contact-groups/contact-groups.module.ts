import { Module } from '@nestjs/common';
import { ContactGroupsService } from './contact-groups.service';
import { ContactGroupsController } from './contact-groups.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ContactGroupsController],
  providers: [ContactGroupsService],
  imports: [PrismaModule],
})
export class ContactGroupsModule {}
