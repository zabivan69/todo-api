import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateTaskOutput {
  @Field(() => Boolean, { description: 'Success boolean' })
  success: boolean;
}
