import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Message } from 'src/utils/message.event';

@Controller('rabbit')
export class RmqClientController {
  constructor(@Inject('TEST_SERVICE') private readonly client: ClientProxy) {}

  async onApplicationBootstrap() {
    //await this.client.connect();
  }

  @Get()
  getHello(): string {
    this.client.emit<any>('message_printed', new Message({ message: 'test' }));

    return 'Hello world printed';
  }
}
