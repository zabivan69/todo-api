import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetTasksOutput {
  @Field(() => ID, { description: 'Generated maps' })
  id: 'uuid';

  @Field(() => String, { description: 'Title' })
  title: string;

  @Field(() => Boolean, { description: 'Is done' })
  isDone: boolean;

  @Field(() => Date, { description: 'Created at' })
  createdAt: Date;

  @Field(() => Date, { description: 'Updated at' })
  updatedAt: Date;

  @Field(() => ID, { description: 'User id' })
  userId: 'uuid';
}
