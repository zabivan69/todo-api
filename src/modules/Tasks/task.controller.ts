import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateTaskSwaggerDocs,
  DeleteTaskSwaggerDocs,
  GetUserTasksSwaggerDocs,
  UpdateTaskSwaggerDocs,
} from 'src/common/decorators/task.swagger.decorators';
import { UserBody } from 'src/common/decorators/user.decorator';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { User } from 'src/entities/user.entity';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { TaskService } from './task.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @CreateTaskSwaggerDocs()
  @UseGuards(AccessTokenGuard)
  @Post('')
  async createTask(@UserBody() user: User, @Body() dto: CreateTaskDto) {
    return await this.taskService.createTask(dto, user.id);
  }

  @GetUserTasksSwaggerDocs()
  @UseGuards(AccessTokenGuard)
  @Get('')
  async getUserTasks(@UserBody() user: User) {
    return await this.taskService.getUserTasks(user?.id);
  }

  @UpdateTaskSwaggerDocs()
  @UseGuards(AccessTokenGuard)
  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return await this.taskService.updateTask(dto, id);
  }

  @DeleteTaskSwaggerDocs()
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return await this.taskService.deleteTask(id);
  }
}
