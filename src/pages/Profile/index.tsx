import React, {useState, ReactType, ReactNode} from 'react';
import {Text, Separator} from './../../ui';
import {TabLink} from './../../components';
import {PropsApp} from './../../@types/app.navigation';
import {
  ProfileContainer,
  ProfileuserPicture,
  ProfileuserData,
  ProfileTabContent,
  ProfileBody,
} from './_styled';
import {ETabLinks} from './../../@types/tablink';
import {GetUniqueId} from './../../helper';
import ProfileBio from './Bio';
import ProfilePosts from './Posts';
import ProfileCourses from './Courses';
import ProfileReviews from './Reviews';

const TAB_LINKS = [
  {id: GetUniqueId(), name: 'bio', label: 'Bio', active: true, component: ProfileBio},
  {id: GetUniqueId(), name: 'posts', label: 'Posts', component: ProfilePosts},
  {id: GetUniqueId(), name: 'courses', label: 'Courses', component: ProfileCourses},
  {id: GetUniqueId(), name: 'reviews', label: 'Reviews', component: ProfileReviews},
] as Array<ETabLinks>;

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
    <ProfileContainer>
      <ProfileuserPicture>
        <ProfileuserData>
          <Text preset="title" color="ligth">
            Profile user name
          </Text>
          <Text preset="comment" color="ligth">
            Rating her
          </Text>
        </ProfileuserData>
      </ProfileuserPicture>
      <Separator size="small" />
      <ProfileBody>
        <TabLink
          onPress={onTabLinkPress}
          links={TAB_LINKS}
          active={currentTab}
        />
        <ProfileTabContent>
          {transformComponent(currentTab.component, {})}
        </ProfileTabContent>
      </ProfileBody>
    </ProfileContainer>
  );
};
