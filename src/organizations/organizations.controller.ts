import { Controller, Post, Body } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  async create(@Body('name') name: string) {
    return this.organizationsService.create(name);
  }
} 