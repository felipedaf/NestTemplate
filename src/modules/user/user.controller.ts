import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @ApiOkResponse({
    description: 'Some random user description here!',
  })
  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number) {
    const user = await this.service.get(id);

    return user;
  }

  @ApiCreatedResponse({
    description: 'Some random user create description here!',
  })
  @Post('/')
  async create(@Body() user: CreateUserDto) {
    const createdUser = await this.service.create(user);

    return createdUser;
  }
}
