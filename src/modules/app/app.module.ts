import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { RmqClientModule } from '../rmqClient/rmqClient.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./envs/.${process.env['ENV']}.env`,
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: +process.env['THROTTLE_TTL'],
      limit: +process.env['THROTTLE_LIMIT'],
    }),
    PrismaModule,
    UserModule,
    RmqClientModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
