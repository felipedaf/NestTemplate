import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RepositoryService } from 'src/interfaces/repository.service';

@Injectable()
export class PrismaService<T>
  extends PrismaClient
  implements OnModuleInit, RepositoryService<T>
{
  async findById(id: number, repo: string): Promise<T> {
    return this[repo].findUnique({
      where: { id },
    });
  }
  async findByProperty(propertySet: object, repo: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  async create(obj: Partial<T>, repo: string): Promise<T> {
    return this[repo].create({
      data: { ...obj },
    });
  }
  async delete(id: string, repo: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
