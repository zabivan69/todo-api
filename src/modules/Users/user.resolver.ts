import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { User } from 'src/entities/user.entity';

import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Query(() => User)
  async getUserInfo(@Args('id') id: string): Promise<User> {
    return await this.userService.getUserInfo(id);
  }
}
