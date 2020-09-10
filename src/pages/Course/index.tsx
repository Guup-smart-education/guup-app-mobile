import React, {useState, ReactType, ReactNode} from 'react';
import {TouchableWithoutFeedback as TouchArea, View} from 'react-native';
import {Container, Text, Icon, Score, Separator, Link} from './../../ui';
import {Avatar, TabLink} from './../../components';
import {PropsApp} from './../../@types/app.navigation';
import {
  CourseDetailContainer,
  CourseDetailHeader,
  CourseDetailHeaderRight,
  CourseDetailHeaderLeft,
  CourseDetailContent,
  FooterContainer,
  FooterLabels,
} from './_styled';
import {ETabLinks} from './../../@types/tablink';
import {GetUniqueId} from './../../helper';
import CourseContent from './Content';
import CourseGains from './Gains';
import CoursePrerequisites from './Prerequisites';
import CourseRating from './Rating';

const TAB_LINKS = [
  {id: GetUniqueId(), label: 'Content', active: true, component: CourseContent},
  {id: GetUniqueId(), label: 'Prerequisite', component: CoursePrerequisites},
  {id: GetUniqueId(), label: 'Rating', component: CourseRating},
  {id: GetUniqueId(), label: 'Gains', component: CourseGains},
] as Array<ETabLinks>;

const CourseScreen: React.FC<PropsApp> = ({navigation: {navigate}}) => {
  const [currentTab, setCurrentTab] = useState<ETabLinks>(TAB_LINKS[0]);
  const COURSE_NAME = 'Here we go the course name';
  const COURSE_DESC =
    'Learn the basics of programming through HTML, CSS, and Python. Explore possible programming paths with our final project selection. Get confident in your ability to think and problem-solve like a programmer.';
  const OWNER = 'Owner course name';
  const PROFISSION = 'Owner profission / job / work';
  const onTabLinkPress = (link: ETabLinks) => {
    setCurrentTab(link);
  };
  const transformComponent = (component: ReactNode, params = {}) => {
    const Component: ReactType = component;
    return <Component {...params} />;
  };
  return (
    <Container>
      <CourseDetailContainer showsVerticalScrollIndicator={false}>
        <CourseDetailHeader>
          <CourseDetailHeaderRight>
            <Text preset="title">{COURSE_NAME}</Text>
            <Separator size="small" />
            <TouchArea
              onPress={() => navigate('GuupUserProfile', {type: 'teacher'})}>
              <View>
                <Avatar firstText={OWNER} secondText={PROFISSION} />
              </View>
            </TouchArea>
          </CourseDetailHeaderRight>
          <CourseDetailHeaderLeft>
            <Icon source="heart" />
            <Separator size="lili" />
            <Score score="4.5" firstColor="dark" secondColor="darkGrey" />
            <Separator size="tiny" />
            <Score
              score="1.5k"
              label="Enroll"
              firstColor="dark"
              secondColor="darkGrey"
            />
          </CourseDetailHeaderLeft>
        </CourseDetailHeader>
        <Separator size="small" />
        <Text lineHeight={28} color="ultraDark">
          {COURSE_DESC}
        </Text>
        <Separator size="large" />
        <TabLink
          onPress={onTabLinkPress}
          links={TAB_LINKS}
          active={currentTab}
        />
        <CourseDetailContent>
          {transformComponent(currentTab.component, {})}
        </CourseDetailContent>
      </CourseDetailContainer>
      <FooterContainer>
        <FooterLabels>
          <Text color="ligth" preset="largePrice">
            R$ 149.00
          </Text>
          <Link color="ligth" onPress={() => console.log('Comprar')}>
            Comprar
          </Link>
        </FooterLabels>
      </FooterContainer>
    </Container>
  );
};

export default CourseScreen;
