/* eslint-disable react-hooks/exhaustive-deps */
import R from 'ramda';
import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, View, Alert, ActivityIndicator} from 'react-native';
import {Container, Text, Icon, Action, Separator, Link} from './../../ui';
import {GuupHeader, Course} from './../../components';
import {PropsApp} from './../../@types/app.navigation';
import {IMenuItemProps} from './../../@types/menu.item';
import {
  CoursesContainer,
  CoursesHeader,
  CourseBody,
  CourseItem as CourseItemContainer,
} from './_styled';
import {useIsFocused} from '@react-navigation/native';
import {
  useGetCoursesByUserLazyQuery,
  Path,
  Course as CourseType,
} from './../../graphql/types.d';
import {GetUniqueId, shadowStyle} from './../../helper';
import {LIMIT_PER_PAGE} from './../../constants';
// import {usePathContext} from './../../contexts/path';

// Component
const Collections: React.FC<PropsApp> = ({navigation: {goBack, navigate}}) => {
  const isFocused = useIsFocused();
  // const {state, dispatch} = usePathContext();
  const [
    getCourses,
    {loading, data, error, fetchMore, refetch},
  ] = useGetCoursesByUserLazyQuery();
  const [allCourses, setAllCourses] = useState<Array<Path>>([]);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);
  const [isNoMoreCourses, setIsNoMoreCourses] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  // Effects
  useEffect(() => {
    if (refetch && isFocused) {
      setIsRefetch(true);
      refetch();
    }
  }, [refetch, isFocused]);
  useEffect(() => {
    R.isEmpty(allCourses) && getCourses();
  }, [allCourses, getCourses]);

  useEffect(() => {
    if (fetchMore && loadMore && snapshot && !isNoMoreCourses) {
      console.log('Fect more');
      fetchMore({
        variables: {lastCourse: snapshot},
      });
    }
  }, [snapshot, loadMore]);

  useEffect(() => {
    if (data?.getCoursesByUser?.__typename === 'GetCoursesByOwner') {
      const courseData: Array<any> = [
        ...(data.getCoursesByUser.coursesByOwner || []),
      ];
      const unionCourses = R.union(
        [...(!isRefetch ? allCourses : [])],
        [...courseData],
      );
      // setAllData([...allPaths]);
      setAllCourses(unionCourses);
      console.log('data?.getCoursesByUser: ', courseData);
      setIsNoMoreCourses(courseData.length < LIMIT_PER_PAGE);
      setLoadMore(false);
      setSnapshot(null);
      setIsRefetch(false);
    } else if (data?.getCoursesByUser?.__typename === 'ErrorResponse') {
      Alert.alert(
        'Aconteceu um erro',
        `${data.getCoursesByUser.error.message}`,
      );
    }
  }, [data]);

  // End effects
  // Calbacks
  const keyExtractor = useCallback(
    ({id}: Path) => `collection-path-${id || GetUniqueId()}`,
    [],
  );

  const CourseItem = useCallback(
    ({item}: {item: CourseType}) => {
      return (
        <CourseItemContainer>
          {/* <CourseItemContainer style={shadowStyle.newPost}> */}
          <Separator size="tiny" />
          <Course {...{...item}} model="OWNER" />
        </CourseItemContainer>
      );
    },
    [navigate],
  );
  const ListEmpty = useCallback(
    () => (
      <Container center>
        <Text center>Não conteudos disponiveis</Text>
        <Link onPress={() => navigate('GuupContentCreate', {path: ''})}>
          Criar um conteudo
        </Link>
      </Container>
    ),
    [navigate],
  );
  const ListLoadMore = useCallback(() => {
    if (loadMore) {
      return (
        <View>
          <Separator size="lili" />
          <ActivityIndicator />
          <Separator size="extraLarge" />
        </View>
      );
    }
    return <Separator size="large" />;
  }, [loadMore]);
  // End callbacks
  // Branchs
  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="small" />
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <Text>error</Text>
      </Container>
    );
  }
  // End branchas
  // Handlers
  const handlefetchMoreData = () => {
    if (!loadMore && !snapshot && !isNoMoreCourses) {
      const lastCourse = R.last(allCourses)?.id;
      setLoadMore(true);
      setSnapshot(lastCourse || null);
    }
  };

  const handleRefresh = () => {
    setIsNoMoreCourses(false);
    setLoadMore(false);
    setIsRefetch(true);
    refetch && refetch();
  };
  // End handlers
  return (
    <Container safe light>
      <CoursesContainer>
        <CoursesHeader>
          <GuupHeader
            hasBack
            title="Meus conteudos"
            onLeftPress={() => goBack()}
            rightRenderIntem={
              <Action onPress={() => navigate('GuupContentCreate')}>
                <Icon source="plus" />
              </Action>
            }
          />
        </CoursesHeader>
        <CourseBody>
          {!R.isEmpty(allCourses) ? (
            <FlatList
              keyExtractor={keyExtractor}
              data={allCourses}
              renderItem={CourseItem}
              showsVerticalScrollIndicator={false}
              scrollEnabled={!!allCourses}
              maxToRenderPerBatch={20}
              nestedScrollEnabled
              ListFooterComponent={ListLoadMore}
              onEndReachedThreshold={0.9}
              onEndReached={handlefetchMoreData}
              refreshing={loading}
              onRefresh={handleRefresh}
            />
          ) : (
            <ListEmpty />
          )}
        </CourseBody>
      </CoursesContainer>
    </Container>
  );
};

export default Collections;
