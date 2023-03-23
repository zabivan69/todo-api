import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTaskDto {
  @Field()
  @ApiProperty({ example: 'Some task...' })
  @IsNotEmpty()
  @IsString()
  title: string;
}
