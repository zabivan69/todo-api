import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../Auth/dto/create.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserInfo(userId: string) {
    return await this.assertUserExists(userId);
  }

  async createUser(dto: CreateUserDto) {
    return await this.userRepository.save(dto);
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
  }

  async assertEmailNotExists(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new BadRequestException('User with this email already exists');
    }
  }

  async assertEmailExists(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }

    return user;
  }

  async assertUserExists(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('No such user');
    }

    return user;
  }
}
