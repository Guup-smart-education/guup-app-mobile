export interface ICourseModule {
  readonly moduleId?: any;
  readonly moduleThumbnail?: string;
  readonly moduleName: string;
  readonly moduleDescription: string;
  readonly moduleProgress: number;
  readonly moduleProjects: number;
  readonly moduleContents: number;
  readonly moduleHours: number;
}

export interface ICourseProgress {
  readonly percentCompleted: number;
  readonly projectsCompleted: number;
  readonly modulesCompleted: number;
  readonly totalModules: number;
  readonly courseNotification: number;
  readonly hoursSpended: number;
}

export interface ICourseCover extends ICourseProgress {
  readonly courseId: any;
  readonly courseArea: string;
  readonly courseName: string;
}
