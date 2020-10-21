import R from 'ramda';
import React, {useState, useEffect, useCallback} from 'react';
import {
  TouchableWithoutFeedback as TouchArea,
  View,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  Text,
  Icon,
  Separator,
  Link,
  HeaderPatch,
  Action,
  GroupAvatar,
} from './../../ui';
import {Avatar, GuupCourseCard, GuupHeader} from './../../components';
import {
  CourseDetailContainer,
  CourseDetailHeader,
  CourseDetailContent,
  CourseDetailDataBody,
  CourseDetailDataBottom,
  CourseDetailDataRight,
  CourseDetailDataLeft,
  CourseDetailDataContent,
} from './_styled';
import {CourseDetailPropsApp} from './../../@types/app.navigation';
import {usePathContext} from './../../contexts/path';
import {useGetCoursesByPathLazyQuery, Course} from './../../graphql/types.d';
import {GetUniqueId} from './../../helper';

// List empty data
const ListEmpty = () => {
  return (
    <View>
      <Separator size="large" />
      <Text center>Não há conteudos disponiveis</Text>
    </View>
  );
};

const CourseScreen: React.FC<CourseDetailPropsApp> = ({
  navigation: {navigate, goBack},
  route: {
    params: {mode},
  },
}) => {
  console.log('params: mode -> ', mode);
  const [allCourses, setAllCourses] = useState<Array<Course>>();
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const {
    state: {currentPath},
  } = usePathContext();
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

  const CourseItem = useCallback(({item}: {item: Course}) => {
    return (
      <View>
        <Separator size="large" />
        <GuupCourseCard
          type="COURSE"
          imageUri={item.photoURL || ''}
          title={item.title || 'Guup course'}
          owner={item.ownerProfile || {}}
          contentType="Video"
          createdAt={item.createdAt || ''}
          onPress={() =>
            Alert.alert('Show the course', 'Show all video course')
          }
        />
      </View>
    );
  }, []);

  const ListHeader = useCallback(() => {
    return (
      <CourseDetailDataContent>
        <CourseDetailDataBody>
          <CourseDetailDataRight>
            <Text preset="largePrice">{currentPath.title}</Text>
            <Separator size="small" />
            <TouchArea
              onPress={() => navigate('GuupUserProfile', {type: 'teacher'})}>
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
          </CourseDetailDataRight>
          <CourseDetailDataLeft>
            {mode === 'EDIT' ? (
              <Action onPress={() => Alert.alert('Edit', 'Edit some thing')}>
                <Icon source="dots" backColor="veryLigthGrey" />
              </Action>
            ) : (
              <Action
                onPress={() =>
                  Alert.alert('Alert', 'Alert me with new information')
                }>
                <Icon source="bell" />
              </Action>
            )}
          </CourseDetailDataLeft>
        </CourseDetailDataBody>
        <CourseDetailDataBottom>
          <Separator size="small" />
          <Text lineHeight={28} color="ultraDark">
            {currentPath.description}
          </Text>
        </CourseDetailDataBottom>
      </CourseDetailDataContent>
    );
  }, [currentPath, navigate, mode]);

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
        <CourseDetailHeader>
          <GuupHeader
            leftRenderIntem={
              <Action onPress={() => goBack()}>
                <Icon source="arrow" />
              </Action>
            }
            rightRenderIntem={
              <Link
                color="primary"
                onPress={() =>
                  mode === 'EDIT'
                    ? Alert.alert('Adicionar', 'Adicionar conteudo')
                    : Alert.alert('Contribuir', 'Contribuir')
                }>
                {mode === 'EDIT' ? 'Adicionar +' : 'Contribuir +'}
              </Link>
            }
          />
        </CourseDetailHeader>
        <CourseDetailContent>
          <FlatList
            showsVerticalScrollIndicator={false}
            // scrollEnabled={!R.isEmpty(allCourses)}
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
    </Container>
  );
};

export default CourseScreen;
