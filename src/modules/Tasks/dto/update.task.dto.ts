import { Field, ID, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateTaskDto {
  @Field(() => ID)
  @IsOptional()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @ApiProperty({ example: 'Some task...', required: false })
  @IsOptional()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isDone: boolean;
}
