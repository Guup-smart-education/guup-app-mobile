import R from 'ramda';
import React, {useState, useEffect, useCallback} from 'react';
import {
  TouchableWithoutFeedback as TouchArea,
  View,
  Alert,
  FlatList,
} from 'react-native';
import {
  Container,
  Text,
  Icon,
  Separator,
  Link,
  HeaderPatch,
  FooterPatch,
  Action,
  GroupAvatar,
} from './../../ui';
import {Avatar, GuupCourseCard, GuupHeader} from './../../components';
import {
  CourseDetailContainer,
  CourseDetailHeader,
  CourseDetailHeaderRight,
  CourseDetailHeaderLeft,
  CourseDetailContent,
  CourseDetailHeaderTop,
  CourseDetailHeaderBody,
  CourseDetailHeaderBottom,
  FooterContainer,
  FooterLabels,
} from './_styled';
import {useNavigation} from '@react-navigation/native';
import {CourseDetailScreenNavigationProp} from './../../@types/app.navigation';
import {usePathContext, PathTypes} from './../../contexts/path';
import {useGetCoursesByPathLazyQuery, Course} from './../../graphql/types.d';
import {GetUniqueId} from './../../helper';

// List empty data
const ListEmpty = () => {
  return (
    <View>
      <Separator size="large" />
      <Text center>Não há publicações disponiveis</Text>
    </View>
  );
};

const CourseScreen: React.FC = () => {
  const [allCourses, setAllCourses] = useState<Array<Course>>();
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const {
    state: {currentPath},
    dispatch,
  } = usePathContext();
  const navigation = useNavigation<CourseDetailScreenNavigationProp>();
  const [getCourses, {data, error, loading}] = useGetCoursesByPathLazyQuery();

  // Effects
  useEffect(() => {
    getCourses &&
      currentPath &&
      getCourses({
        variables: {
          path: currentPath.id || '',
        },
      });
  }, [getCourses, currentPath]);
  useEffect(() => {
    if (data?.getCoursesByPath?.__typename === 'GetCourses') {
      const coursesData: Array<any> = [
        ...(data.getCoursesByPath.courses || []),
      ];
      console.log('data?.getCoursesByPath', coursesData);
      coursesData && setAllCourses([...coursesData]);
    } else if (data?.getCoursesByPath?.__typename === 'ErrorResponse') {
      Alert.alert(
        'Aconteceu um problema',
        data.getCoursesByPath.error.message ||
          'Ops!! Aconteceu um problema com a chamda, tente novamente',
      );
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      Alert.alert('Aconteceu um problema', 'Oops!! Aconteceu um problema');
    }
  }, [error]);
  // End effects

  // Callbacks
  const keyExtractor = useCallback(
    ({id}: Course) => `course-detail-item-${id || GetUniqueId()}`,
    [],
  );

  const CourseItem = useCallback(
    ({item}: {item: Course}) => {
      return (
        <View>
          <Separator size="large" />
          <GuupCourseCard
            type="COURSE"
            imageUri={item.photoURL || ''}
            title={item.title || 'Guup course'}
            owner={item.ownerProfile || {}}
            onPress={() =>
              Alert.alert('Show the course', 'Show all video course')
            }
          />
        </View>
      );
    },
    [navigation],
  );

  const ListHeader = useCallback(() => {
    return (
      <CourseDetailHeader>
        <CourseDetailHeaderTop>
          <GuupHeader
            leftRenderIntem={
              <Action onPress={() => navigation.goBack()}>
                <Icon source="arrow" />
              </Action>
            }
          />
          <Separator size="tiny" />
        </CourseDetailHeaderTop>
        <CourseDetailHeaderBody>
          <CourseDetailHeaderRight>
            <Text preset="largePrice">{currentPath.title}</Text>
            <Separator size="small" />
            <TouchArea
              onPress={() =>
                navigation.navigate('GuupUserProfile', {type: 'teacher'})
              }>
              {!currentPath.owners || currentPath.owners.length === 1 ? (
                <Avatar
                  firstText={currentPath.ownerProfile?.displayName}
                  secondText={currentPath.ownerProfile?.profission}
                  image={currentPath.ownerProfile?.thumbnailURL}
                />
              ) : (
                <GroupAvatar
                  avatars={currentPath.owners?.map(
                    (item) => item?.thumbnailURL,
                  )}
                />
              )}
            </TouchArea>
          </CourseDetailHeaderRight>
          <CourseDetailHeaderLeft>
            <Icon source="bell" />
          </CourseDetailHeaderLeft>
        </CourseDetailHeaderBody>
        <CourseDetailHeaderBottom>
          <Separator size="small" />
          <Text lineHeight={28} color="ultraDark">
            {currentPath.description}
          </Text>
        </CourseDetailHeaderBottom>
      </CourseDetailHeader>
    );
  }, [currentPath, navigation]);

  const ListLoadMore = useCallback(() => {
    if (loadMore) {
      return (
        <View>
          <Text center>Carregando mais coisas</Text>
          <Separator size="lili" />
          <ActivityIndicator />
          <Separator size="extraLarge" />
        </View>
      );
    }
    return <Separator size="large" />;
  }, [loadMore]);

  // End callbacks

  return (
    <Container safe>
      <CourseDetailContainer>
        <HeaderPatch />
        <CourseDetailContent>
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={!R.isEmpty(allCourses)}
            data={allCourses}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={20}
            nestedScrollEnabled
            renderItem={CourseItem}
            ListEmptyComponent={ListEmpty}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListLoadMore}
            onEndReachedThreshold={0.9}
            // onEndReached={handlefetchMoreData}
            refreshing={loading}
            // onRefresh={handleRefresh}
          />
        </CourseDetailContent>
      </CourseDetailContainer>
      <FooterContainer>
        <FooterLabels>
          <Link
            color="contrast"
            onPress={() => Alert.alert('Contribuir', 'Contribuir')}>
            contribuir +
          </Link>
        </FooterLabels>
      </FooterContainer>
      <FooterPatch />
    </Container>
  );
};

export default CourseScreen;
