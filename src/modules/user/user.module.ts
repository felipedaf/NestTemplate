import { Module } from '@nestjs/common';
import { RepositoryService } from 'src/interfaces/repository.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: RepositoryService,
      useClass: PrismaService,
    },
    UserService,
  ],
})
export class UserModule {}
