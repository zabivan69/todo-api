import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteTaskOutput {
  @Field(() => Boolean, { description: 'Success boolean' })
  success: boolean;
}
