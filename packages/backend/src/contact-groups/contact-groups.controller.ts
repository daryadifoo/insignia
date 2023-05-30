import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactGroupsService } from './contact-groups.service';
import { CreateContactGroupDto } from './dto/create-contact-group.dto';
import { UpdateContactGroupDto } from './dto/update-contact-group.dto';

@Controller('contact-groups')
export class ContactGroupsController {
  constructor(private readonly contactGroupsService: ContactGroupsService) {}

  @Post()
  create(@Body() createContactGroupDto: CreateContactGroupDto) {
    return this.contactGroupsService.create(createContactGroupDto);
  }

  @Get()
  findAll() {
    return this.contactGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactGroupsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactGroupDto: UpdateContactGroupDto
  ) {
    return this.contactGroupsService.update(id, updateContactGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactGroupsService.remove(id);
  }
}
