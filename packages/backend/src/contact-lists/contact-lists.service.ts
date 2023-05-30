import { Injectable } from '@nestjs/common';
import { CreateContactListDto } from './dto/create-contact-list.dto';
import { UpdateContactListDto } from './dto/update-contact-list.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactListsService {
  constructor(private prisma: PrismaService) { }
  create(createContactListDto: CreateContactListDto) {
    return this.prisma.contactList.create({ data: createContactListDto });
  }

  findAll() {
    return this.prisma.contactList.findMany();
  }

  findOne(id: string) {
    return this.prisma.contactList.findUnique({ where: { id } });
  }

  update(id: string, updateContactListDto: UpdateContactListDto) {
    return this.prisma.contactList.update({
      where: { id },
      data: updateContactListDto,
    });
  }

  remove(id: string) {
    return this.prisma.contactList.delete({ where: { id } });
  }
}
