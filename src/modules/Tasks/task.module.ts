import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { TaskController } from './task.controller';
import { TaskGrpcController } from './task.grpc.controller';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController, TaskGrpcController],
  providers: [TaskService, JwtService, TaskResolver],
  exports: [],
})
export class TaskModule {}
