import React, {ReactNode, useState, ReactType} from 'react';
import {GetUniqueId} from './../../helper';
import {TabLink} from './../../components';
import {Text, Separator, Icon, Action} from './../../ui';
import {ETabLinks} from './../../@types/tablink';
import {PropsApp} from './../../@types/app.navigation';
import RoomModules from './Modules';
import RoomProjects from './Projects';
import RoomCommunity from './Community';
import RoomAchievements from './Achievements';
import {
  ClassRoomContainer,
  ClassRoomData,
  ClassRoomHeader,
  ClassRoomTitle,
  ClassRoomInfo,
  ClassRoomBody,
  ClassRoomContent,
  ClassRoomTabScroll,
  ClassRoomTabs,
} from './_styled';

const TAB_LINKS: Array<ETabLinks> = [
  {
    id: GetUniqueId(),
    name: 'modules',
    label: 'Modules',
    active: true,
    component: RoomModules,
  },
  {
    id: GetUniqueId(),
    name: 'projects',
    label: 'Projects',
    component: RoomProjects,
  },
  {
    id: GetUniqueId(),
    name: 'achievements',
    label: 'Achievements',
    component: RoomAchievements,
  },
  {
    id: GetUniqueId(),
    name: 'community',
    label: 'Community',
    component: RoomCommunity,
  },
];

export default ({navigation}: PropsApp) => {
  const [currentTab, setCurrentTab] = useState<ETabLinks>(TAB_LINKS[0]);
  const onTabLinkPress = (link: ETabLinks) => {
    setCurrentTab(link);
  };
  const transformComponent = (component: ReactNode, params = {}) => {
    const Component: ReactType = component;
    return <Component {...params} />;
  };
  return (
    <ClassRoomContainer showsVerticalScrollIndicator={false}>
      <ClassRoomData>
        <ClassRoomHeader>
          <ClassRoomTitle>
            <Text preset="label" color="darkGrey">Development & TI</Text>
            <Separator size="lili" />
            <Text preset="title">Intro to development</Text>
          </ClassRoomTitle>
          <ClassRoomInfo>
            <Text preset="title" bold color="primary">0%</Text>
            <Separator size="lili" />
            <Icon source="heart" tintColor="dark" />
            {/* <Action onPress={() => toggleAcordion(!acordion)}>
              <Icon source="chevron" />
            </Action> */}
          </ClassRoomInfo>
        </ClassRoomHeader>
        <Separator size="small" />
        <ClassRoomBody>
          <Text lineHeight={28}>
            {' '}
            Learn the basics of programming through HTML, CSS, and Python.
            Explore possible programming paths with our final project
            selection. Get confident in your ability to think and
            problem-solve like a programmer.
          </Text>
        </ClassRoomBody>
        {/* {acordion && (
          <>
            <Separator size="small" />
            <ClassRoomBody>
              <Text lineHeight={28}>
                {' '}
                Learn the basics of programming through HTML, CSS, and Python.
                Explore possible programming paths with our final project
                selection. Get confident in your ability to think and
                problem-solve like a programmer.
              </Text>
            </ClassRoomBody>
          </>
        )} */}
      </ClassRoomData>
      <ClassRoomTabScroll horizontal showsHorizontalScrollIndicator={false}>
        <ClassRoomTabs>
          <TabLink
            onPress={onTabLinkPress}
            links={TAB_LINKS}
            active={currentTab}
          />
        </ClassRoomTabs>
      </ClassRoomTabScroll>
      <ClassRoomContent>
        {transformComponent(currentTab.component, {navigation})}
      </ClassRoomContent>
    </ClassRoomContainer>
  );
};
