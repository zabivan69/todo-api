import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginUserDto {
  @Field()
  @ApiProperty({ example: 'admin@admin.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @Field()
  @ApiProperty({ example: 'qwerty12' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
