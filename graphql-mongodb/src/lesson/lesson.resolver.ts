import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { lessonType } from './lesson.type';

@Resolver((of) => lessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}
  @Query((returns) => lessonType)
  lesson() {
    return {
      id: 'oeikahngeo',
      name: 'Phisics class',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }
  @Mutation((returns) => lessonType)
  createLesson(
    @Args('name') name: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ) {
    this.lessonService.createLesson(name, startDate, endDate);
  }
}
