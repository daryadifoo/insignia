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
import { ContactGroupsService } from './contact-groups.service';
import { CreateContactGroupDto } from './dto/create-contact-group.dto';
import { UpdateContactGroupDto } from './dto/update-contact-group.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('contact-groups')
export class ContactGroupsController {
  constructor(private readonly contactGroupsService: ContactGroupsService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createContactGroupDto: CreateContactGroupDto) {
    return this.contactGroupsService.create(createContactGroupDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.contactGroupsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactGroupsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactGroupDto: UpdateContactGroupDto
  ) {
    return this.contactGroupsService.update(id, updateContactGroupDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactGroupsService.remove(id);
  }
}
