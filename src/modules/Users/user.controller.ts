import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserBody } from 'src/common/decorators/user.decorator';
import { GetUserInfoSwaggerDocs } from 'src/common/decorators/user.swagger.decorators';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GetUserInfoSwaggerDocs()
  @UseGuards(AccessTokenGuard)
  @Get('info')
  async getUserInfo(@UserBody() user: User) {
    return await this.userService.getUserInfo(user?.id);
  }
}
