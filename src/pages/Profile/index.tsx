import R from 'ramda';
import React, {useState, useContext} from 'react';
import {Text, Separator, Container, Icon, Link} from './../../ui';
import {TabLink, GuupHeader} from './../../components';
import {ProfilePropsApp} from './../../@types/app.navigation';
import {
  ProfileContainer,
  ProfileuserPicture,
  ProfileuserData,
  ProfileTabContent,
  ProfileBody,
  ProfileHeader,
} from './_styled';
import {ETabLinks} from './../../@types/tablink';
import {GetUniqueId} from './../../helper';
import ProfileBio from './Bio';
import ProfilePosts from './Posts';
import ProfileCourses from './Courses';
import AuthContext from './../../contexts/auth';

const TAB_LINKS = [
  {
    id: GetUniqueId(),
    name: 'bio',
    label: 'Bio',
    active: true,
  },
  {id: GetUniqueId(), name: 'posts', label: 'Posts'},
  {
    id: GetUniqueId(),
    name: 'courses',
    label: 'Courses',
  },
] as Array<ETabLinks>;

const Profile: React.FC<ProfilePropsApp> = ({
  navigation: {goBack},
  route: {
    params: {type},
  },
}) => {
  const {user} = useContext(AuthContext);
  const [currentTab, setCurrentTab] = useState<ETabLinks>(TAB_LINKS[0]);
  const onTabLinkPress = (link: ETabLinks) => {
    setCurrentTab(link);
  };
  console.log('ProfilePropsApp: ', user);
  return (
    <Container safe light>
      <ProfileHeader>
        <GuupHeader
          leftRenderIntem={
            <Link onPress={() => goBack()}>
              <Icon source="arrow" />
            </Link>
          }
          centerRenderItem={
            <Text preset="comment" bold>
              Perfil
            </Text>
          }
        />
      </ProfileHeader>
      <ProfileContainer>
        <ProfileuserPicture source={{uri: `${user?.photoURL}`}}>
          <ProfileuserData>
            <Text preset="title" color="ligth">
              {user?.displayName}
            </Text>
            <Text preset="comment" color="ligth">
              {user?.profission}
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
            {R.cond([
              [
                R.equals('bio'),
                () => <ProfileBio bio={user?.presentation || ''} />,
              ],
              [R.equals('posts'), () => <ProfilePosts />],
              [R.equals('bio'), () => <ProfileCourses />],
              [R.T, () => <></>],
            ])(currentTab.name)}
          </ProfileTabContent>
        </ProfileBody>
      </ProfileContainer>
    </Container>
  );
};

export default Profile;
