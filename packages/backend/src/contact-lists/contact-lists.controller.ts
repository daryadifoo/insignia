import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ContactListsService } from './contact-lists.service';
import { CreateContactListDto } from './dto/create-contact-list.dto';
import { UpdateContactListDto } from './dto/update-contact-list.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('contact-lists')
export class ContactListsController {
  constructor(private readonly contactListsService: ContactListsService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createContactListDto: CreateContactListDto) {
    return this.contactListsService.create(createContactListDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.contactListsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactListsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactListDto: UpdateContactListDto
  ) {
    return this.contactListsService.update(id, updateContactListDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactListsService.remove(id);
  }
}
