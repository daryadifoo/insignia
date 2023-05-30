import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { ContactsModule } from '../contacts/contacts.module';
import { ContactListsModule } from '../contact-lists/contact-lists.module';
import { ContactGroupsModule } from '../contact-groups/contact-groups.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ContactsModule, ContactListsModule, ContactGroupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


