/* eslint-disable react-hooks/exhaustive-deps */
import R from 'ramda';
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {Alert, View, FlatList, ActivityIndicator} from 'react-native';
import {Container, Text, Link, Icon, Separator} from './../../ui';
import {
  GuupHeader,
  GuupCourseCard,
  Popover,
  GuupCard,
} from './../../components';
import {
  ExplorerContainer,
  ExplorerHeader,
  ExplorerAction,
  ExplorerTitle,
  ExplorerEmpty,
  ExplorerCourseItem,
  ExplorerBody,
} from './_styled';
import {AppScreenNavigationProp} from './../../@types/app.navigation';
import {usePathContext, PathTypes} from './../../contexts/path';
import {GetUniqueId} from './../../helper';
import {LIMIT_LIST} from './../../constants';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {Path, Course, useGetCoursesLazyQuery} from './../../graphql/types.d';
import AuthContext from './../../contexts/auth';

enum TABS {
  'collections' = 'collections',
  'courses' = 'courses',
}

// Principal component
const ExplorerScreen: React.FC = () => {
  const isFocused = useIsFocused();
  const {user} = useContext(AuthContext);
  const navigation = useNavigation<AppScreenNavigationProp>();
  const [allCourseData, setAllCoursesData] = useState<Array<Path>>([]);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);
  const [isNoMoreData, setIsNoMoreData] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const {dispatch} = usePathContext();
  const [
    getAllCourses,
    {
      data: dataCourses,
      loading: loadingCourses,
      error: errorCourses,
      refetch: refetchCourses,
      fetchMore: fetchMoreCourses,
    },
  ] = useGetCoursesLazyQuery();
  // Effects
  useEffect(() => {
    if (R.isEmpty(allCourseData)) {
      getAllCourses();
    }
  }, [getAllCourses, allCourseData]);

  useEffect(() => {
    if (isFocused) {
      setIsRefetch(true);
      refetchCourses && refetchCourses();
    }
  }, [refetchCourses, isFocused]);

  useEffect(() => {
    if (loadMore && snapshot && !isNoMoreData) {
      fetchMoreCourses &&
        fetchMoreCourses({
          variables: {
            lastCourse: snapshot,
          },
        });
    }
  }, [snapshot, loadMore]);

  useEffect(() => {
    if (dataCourses?.getCourses?.__typename === 'GetCourses') {
      const allCourses: Array<any> = [
        ...(dataCourses.getCourses.courses || []),
      ];
      const unionCourses = R.union(
        [...(!isRefetch ? allCourseData : [])],
        [...allCourses],
      );
      setAllCoursesData(unionCourses);
      setIsNoMoreData(allCourses.length < LIMIT_LIST.medium);
      setIsRefetch(false);
      setLoadMore(false);
      setSnapshot(null);
    } else if (dataCourses?.getCourses?.__typename === 'ErrorResponse') {
      Alert.alert(
        'Aconteceu um erro',
        `${dataCourses.getCourses.error.message}`,
      );
    }
  }, [dataCourses]);
  // End effects

  // Handlers
  const handlefetchMoreData = () => {
    if (!loadMore && !snapshot && !isNoMoreData) {
      if (allCourseData.length >= LIMIT_LIST.medium) {
        const lastCourse = R.last(allCourseData)?.id;
        setSnapshot(lastCourse || null);
      }
      setLoadMore(true);
    }
  };

  const handleRefresh = () => {
    // setIsNoMoreData(false);
    setLoadMore(false);
    setIsRefetch(true);
    refetchCourses && refetchCourses();
  };
  // End handlers

  // Callbacks
  const keyExtractor = useCallback(
    ({id}: Path) => `explorer-path-${id || GetUniqueId()}`,
    [],
  );

  const CourseItem = useCallback(({item}: {item: Course}) => {
    const isOwner = user?.uid === item.owner;
    return (
      <ExplorerCourseItem>
        <GuupCourseCard
          id={`${item.id}`}
          type="PATH"
          model={isOwner ? 'OWNER' : 'PUBLIC'}
          imageUri={item.gifURL || item.thumbnailURL || item.photoURL || ''}
          title={item.title || 'Guup course'}
          description={item.description || ''}
          owner={item.ownerProfile || {}}
          onPress={() => {
            dispatch({type: PathTypes.SET_CURRENT_COURSE, payload: item});
            navigation.navigate('GuupClassVideo', {id: `${item.id}`});
          }}
        />
        <Separator size="tiny" />
      </ExplorerCourseItem>
    );
  }, []);

  const ListHeader = useCallback(() => <Separator size="tiny" />, []);
  const ListEmpty = useCallback(
    () => (
      <Container center>
        <Text center>Não conteudos disponiveis</Text>
        <Separator size="large" />
      </Container>
    ),
    [],
  );

  // const ListLoadMore = useCallback(() => {
  //   if (loadMore && !isNoMoreData) {
  //     return (
  //       <ExplorerEmpty>
  //         <Separator size="lili" />
  //         <ActivityIndicator />
  //         <Separator size="extraLarge" />
  //       </ExplorerEmpty>
  //     );
  //   }
  //   return <Separator size="large" />;
  // }, [loadMore, isNoMoreData]);
  // End callbacks

  // Branchs
  if (loadingCourses) {
    return (
      <Container dark>
        <ActivityIndicator size="small" />
      </Container>
    );
  }
  if (errorCourses) {
    return (
      <Container dark>
        <Text color="primary">error</Text>
      </Container>
    );
  }
  // End branchs

  return (
    <>
      <Container light safe>
        <ExplorerContainer>
          <ExplorerHeader>
            <ExplorerAction>
              <GuupHeader
                hasGuupIcon
                title="Conteudos"
                rightRenderIntem={
                  <Link
                    preset="simple"
                    onPress={() =>
                      navigation.navigate('GuupContentCreate', {
                        path: undefined,
                      })
                    }>
                    {/* onPress={() => setToggleModal(!toggleModal)}> */}
                    <Icon source="plus" blur />
                  </Link>
                }
              />
              {/* <ExplorerTitle>
                <Text preset="header">Confira os conteudos disponiveis</Text>
              </ExplorerTitle>
              <Separator size="small" /> */}
            </ExplorerAction>
            <Separator size="stroke" />
          </ExplorerHeader>
          <ExplorerBody>
            {!allCourseData.length ? (
              <ListEmpty />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                // scrollEnabled={!!allCourseData.length}
                data={allCourseData}
                keyExtractor={keyExtractor}
                maxToRenderPerBatch={20}
                nestedScrollEnabled
                renderItem={CourseItem}
                // ListEmptyComponent={ListEmpty}
                ListHeaderComponent={ListHeader}
                // ListFooterComponent={ListLoadMore}
                onEndReachedThreshold={0.9}
                onEndReached={handlefetchMoreData}
                refreshing={loadingCourses}
                onRefresh={handleRefresh}
              />
            )}
          </ExplorerBody>
        </ExplorerContainer>
      </Container>
      <Popover
        visible={toggleModal}
        toggle={() => setToggleModal(false)}
        height={350}>
        <View>
          <GuupCard
            title="Criar um topico"
            description="Crie um espaço para compartilhar conteudo de um tema especifico entre amigos e colegas de trabalho"
            onPress={() => {
              setToggleModal(false);
              navigation.navigate('GuupCollectionCreate');
            }}
          />
          <Separator size="medium" />
          <GuupCard
            title="Criar um conteudo"
            description="Crie um conteudo e compartilhe seu conhecimento com seu amigos e colegas de trabalho"
            onPress={() => {
              setToggleModal(false);
              navigation.navigate('GuupContentCreate');
            }}
          />
        </View>
      </Popover>
    </>
  );
};

export default ExplorerScreen;
