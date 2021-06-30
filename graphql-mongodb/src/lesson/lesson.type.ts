import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Lesson')
export class lessonType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;
}
