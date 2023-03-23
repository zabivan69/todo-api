import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignOutOutput {
  @Field(() => Boolean, { description: 'Success boolean' })
  success: boolean;
}
