import {ELessonType} from './../@enum/lesson.type';

export interface ILesson {
  readonly id: any;
  readonly type: keyof typeof ELessonType;
  readonly title: string;
  readonly duration: number;
  readonly progress: number;
}

export interface ILessonGroup {
  readonly id: any;
  readonly title: string;
  readonly lessons: Array<ILesson>;
}
