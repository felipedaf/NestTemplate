import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { RepositoryService } from 'src/interfaces/repository.service';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(private repository: RepositoryService<User>) {}

  async get(id: number): Promise<User | null> {
    return this.repository.findById(id, 'user');
  }

  async create(data: CreateUserDto): Promise<User> {
    return await this.repository.create(data, 'user');
  }
}
