import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserBody } from 'src/common/decorators/user.decorator';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { DeleteTaskGqlDto } from './dto/delete.task.gql.dto';
// eslint-disable-next-line
import { CreateTaskDto } from './dto/create.task.dto';
// eslint-disable-next-line
import { UpdateTaskDto } from './dto/update.task.dto';
import { DeleteTaskOutput } from './outputs/delete.task.output';
import { GetTasksOutput } from './outputs/get.tasks.output';
import { UpdateTaskOutput } from './outputs/update.task.output';
import { TaskService } from './task.service';

@Resolver('Task')
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AccessTokenGuard)
  @Mutation(() => Task)
  async createTask(
    @Args('CreateTaskDto') CreateTaskDto: CreateTaskDto,
    @UserBody() user: User,
  ) {
    return await this.taskService.createTask(CreateTaskDto, user.id);
  }

  @UseGuards(AccessTokenGuard)
  @Mutation(() => UpdateTaskOutput)
  async updateTask(@Args('UpdateTaskDto') UpdateTaskDto: UpdateTaskDto) {
    return await this.taskService.updateTask(UpdateTaskDto);
  }

  @UseGuards(AccessTokenGuard)
  @Mutation(() => DeleteTaskOutput)
  async deleteTask(@Args('DeleteTaskDto') DeleteTaskDto: DeleteTaskGqlDto) {
    return await this.taskService.deleteTask(DeleteTaskDto.id);
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => [GetTasksOutput])
  async getUserTasks(@UserBody() user: User) {
    return await this.taskService.getUserTasks(user.id);
  }
}
