import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @ApiProperty({ example: 'admin@admin.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @ApiProperty({ example: 'Name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field()
  @ApiProperty({ example: 'Last name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field()
  @ApiProperty({ example: 'qwerty12' })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minSymbols: 0,
    minNumbers: 0,
    minLowercase: 0,
    minUppercase: 0,
  })
  password: string;
}
