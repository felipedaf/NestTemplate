import { Module } from '@nestjs/common';
import { AuthConfig } from './auth.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  exports: [],
  providers: [AuthService, AuthConfig],
  controllers: [AuthController],
})
export class AuthModule {}
