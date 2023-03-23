import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(dto: CreateTaskDto, userId: string) {
    return await this.taskRepository.save({ ...dto, userId });
  }

  async getUserTasks(userId: string) {
    const tasks = await this.taskRepository.findBy({ userId });

    return { tasks };
  }

  async updateTask(dto: UpdateTaskDto, id?: string) {
    if (!id) {
      await this.taskRepository.update(dto.id, dto);

      return { success: true };
    }

    await this.taskRepository.update(id, dto);

    return { success: true };
  }

  async deleteTask(id: string) {
    await this.taskRepository.delete(id);

    return { success: true };
  }
}
