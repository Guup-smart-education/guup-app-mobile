/* eslint-disable react-hooks/exhaustive-deps */
import R from 'ramda';
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  Alert,
  View,
  FlatList,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
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
  ExplorerCourseItem,
  ExplorerBody,
} from './_styled';
import {AppScreenNavigationProp} from './../../@types/app.navigation';
import {usePathContext, PathTypes} from './../../contexts/path';
import {GetUniqueId} from './../../helper';
import {LIMIT_LIST} from './../../constants';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {
  Course,
  useGetCoursesLazyQuery,
  useClapPostMutation,
  ClapFor,
} from './../../graphql/types.d';
import AuthContext from './../../contexts/auth';

// Principal component
const ExplorerScreen: React.FC = () => {
  const isFocused = useIsFocused();
  const {user} = useContext(AuthContext);
  const navigation = useNavigation<AppScreenNavigationProp>();
  const [allCourseData, setAllCoursesData] = useState<Array<Course>>([]);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);
  const [isNoMoreData, setIsNoMoreData] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const {dispatch} = usePathContext();
  const [sendClap] = useClapPostMutation();
  const [
    getAllCourses,
    {
      data: dataCourses,
      loading: loadingCourses,
      error: errorCourses,
      refetch,
      fetchMore,
    },
  ] = useGetCoursesLazyQuery();
  // Effects
  useEffect(() => {
    if (R.isEmpty(allCourseData)) {
      getAllCourses();
    }
  }, [getAllCourses, allCourseData]);

  useEffect(() => {
    console.log('isFocused: ', isFocused);
    console.log('refetch: ', !!refetch);
    if (isFocused && refetch) {
      setIsRefetch(true);
      refetch();
    }
  }, [refetch, isFocused]);

  useEffect(() => {
    if (loadMore && snapshot && !isNoMoreData) {
      fetchMore &&
        fetchMore({
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
      console.log('allCourses: ', allCourses.length);
      console.log('unionCourses: ', unionCourses.length);
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
    console.log('handleRefresh');
    // setIsNoMoreData(false);
    setLoadMore(false);
    setIsRefetch(true);
    refetch && refetch();
  };

  const onRemoveCourse = (id: string) => {
    const newList = R.filter((item) => item.id !== id, allCourseData);
    setAllCoursesData(newList);
  };

  const onClapCourse = (id: string) => {
    console.log('onClapCourse: ', id);
    sendClap({
      variables: {
        collection: ClapFor.Course,
        post: id,
      },
    });
  };
  // End handlers

  // Callbacks
  const keyExtractor = useCallback(
    ({id}: Course) => `explorer-course-${id || GetUniqueId()}`,
    [],
  );

  const CourseItem: ListRenderItem<Course> = useCallback(
    ({item}: {item: Course}) => {
      const {
        id,
        videoAssetId,
        owner,
        gifURL,
        thumbnailURL,
        photoURL,
        title,
        description,
        ownerProfile,
        claps,
        state,
      } = item;
      const isOwner = user?.uid === owner;
      console.log('isOwner: user?.uid => ', user?.uid);
      console.log('isOwner: owner => ', owner);
      const clapped = claps && R.includes(`${user?.uid}`, claps);
      return (
        <ExplorerCourseItem>
          <GuupCourseCard
            id={`${id}`}
            assetId={`${videoAssetId}`}
            type="PATH"
            model={isOwner ? 'OWNER' : 'PUBLIC'}
            imageUri={photoURL || gifURL || thumbnailURL || ''}
            title={title || 'Guup course'}
            description={description || ''}
            owner={ownerProfile || {}}
            onPress={() => {
              dispatch({type: PathTypes.SET_CURRENT_COURSE, payload: item});
              navigation.navigate('GuupClassVideo', {id: `${id}`});
            }}
            onRemove={onRemoveCourse}
            onClap={onClapCourse}
            status={`${state}`}
            clapped={!!clapped}
          />
          <Separator size="tiny" />
        </ExplorerCourseItem>
      );
    },
    [],
  );

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
      <Container light>
        <ActivityIndicator size="small" />
      </Container>
    );
  }
  if (errorCourses) {
    return (
      <Container light>
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
                initialNumToRender={5}
              />
            )}
          </ExplorerBody>
        </ExplorerContainer>
      </Container>
      {/* Popover para criacao de conteudos */}
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
