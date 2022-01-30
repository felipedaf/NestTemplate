import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqClientController } from './rmqClient.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'TEST_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          const [RMQ_USER, RMQ_PASS, RMQ_PORT, RMQ_HOST] = [
            'RMQ_USER',
            'RMQ_PASS',
            'RMQ_PORT',
            'RMQ_HOST',
          ].map((envVar) => configService.get<string>(envVar));

          return {
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${RMQ_USER}:${RMQ_PASS}@${RMQ_HOST}:${RMQ_PORT}/`],
              queue: 'user-messages',
              queueOptions: {
                durable: false,
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [RmqClientController],
  providers: [],
})
export class RmqClientModule {}
