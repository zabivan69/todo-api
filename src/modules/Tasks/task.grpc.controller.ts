import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AccessGrpcTokenGuard } from 'src/common/guards/accessToken.grpc.guard';
import { TaskService } from './task.service';

@Controller()
export class TaskGrpcController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AccessGrpcTokenGuard)
  @GrpcMethod('TaskService', 'createTask')
  async createTask(data: any) {
    return await this.taskService.createTask(data, data.user.id);
  }

  @UseGuards(AccessGrpcTokenGuard)
  @GrpcMethod('TaskService', 'getUserTasks')
  async getUserTasks(data: any) {
    return await this.taskService.getUserTasks(data.user.id);
  }

  @UseGuards(AccessGrpcTokenGuard)
  @GrpcMethod('TaskService', 'updateTask')
  async updateTask(data: any) {
    delete data.user;

    return await this.taskService.updateTask(data, data.id);
  }

  @UseGuards(AccessGrpcTokenGuard)
  @GrpcMethod('TaskService', 'deleteTask')
  async deleteTask(data: any) {
    return await this.taskService.deleteTask(data.id);
  }
}
