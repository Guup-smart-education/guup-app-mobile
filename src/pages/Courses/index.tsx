import React from 'react';
import {GetUniqueId} from './../../helper';
import {Link} from './../../ui';
import {CommentBot, CourseCover} from './../../components';
import {
  CoursesContainer,
  CoursesHeader,
  CoursesContent,
  CourseEmpty,
  CourseBody,
} from './_styled';
import {ICourseCover} from './../../@types/course.cover';
import {PropsApp} from './../../@types/app.navigation';

const COURSES: Array<ICourseCover> = [
  {
    courseId: GetUniqueId(),
    courseArea: 'Development & TI',
    courseName: 'Intro to development',
    projectsCompleted: 2,
    totalModules: 5,
    modulesCompleted: 4,
    courseNotification: 13,
    hoursSpended: 23,
    percentCompleted: 80,
  },
];

const HAS_COURSES = true;
const TEXT = {
  addCourses: 'Adicionar cursos',
  addMoreCourses: 'Adicionar mais cursos',
};

const CoursesScreen: React.FC<PropsApp> = ({navigation}) => {
  return (
    <CoursesContainer>
      <CoursesHeader>
        <CommentBot text="Aparentemente você ainda não tem nehum curso" />
      </CoursesHeader>
      {!HAS_COURSES ? (
        <CourseEmpty>
          <Link onPress={() => navigation.navigate('GuupExplorer')}>
            {TEXT.addCourses}
          </Link>
        </CourseEmpty>
      ) : (
        <CourseBody showsVerticalScrollIndicator={false} bounces>
          <CoursesContent>
            {COURSES.map((course) => (
              <CourseCover
                key={course.courseId}
                {...course}
                onPress={() =>
                  navigation.navigate('GuupClassRoom', {id: course.courseId})
                }
              />
            ))}
          </CoursesContent>
          <CourseEmpty>
            <Link onPress={() => navigation.navigate('GuupExplorer')}>
              {TEXT.addMoreCourses}
            </Link>
          </CourseEmpty>
        </CourseBody>
      )}
    </CoursesContainer>
  );
};

export default CoursesScreen;
