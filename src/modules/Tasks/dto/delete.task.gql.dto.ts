import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class DeleteTaskGqlDto {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
