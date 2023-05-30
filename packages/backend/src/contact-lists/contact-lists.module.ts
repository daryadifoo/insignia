import { Module } from '@nestjs/common';
import { ContactListsService } from './contact-lists.service';
import { ContactListsController } from './contact-lists.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ContactListsController],
  providers: [ContactListsService],
  imports: [PrismaModule],
})
export class ContactListsModule {}
