import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
  ) {}

  async create(name: string): Promise<Organization> {
    const org = this.organizationsRepository.create({ name });
    return this.organizationsRepository.save(org);
  }

  async findByName(name: string): Promise<Organization | null> {
    return this.organizationsRepository.findOne({ where: { name } });
  }
} 