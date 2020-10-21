/* eslint-disable react-hooks/exhaustive-deps */
import R from 'ramda';
import React, {useState, useEffect, useCallback} from 'react';
import {Alert, View, FlatList, ActivityIndicator, Modal} from 'react-native';
import {Container, Text, Link, Icon, Separator, Action} from './../../ui';
import {
  GuupHeader,
  TabLink,
  GuupCourseCard,
  Popover,
  GuupCard,
} from './../../components';
import {
  ExplorerContainer,
  ExplorerHeader,
  ExplorerBody,
  ExplorerAction,
  ExplorerTitle,
  ExplorerHeaderPatch,
  ExplorerEmpty,
} from './_styled';
import {ETabLinks} from './../../@types/tablink';
import {AppScreenNavigationProp} from './../../@types/app.navigation';
import {GetUniqueId} from './../../helper';
import {LIMIT_PER_PAGE} from './../../constants';
import {useNavigation} from '@react-navigation/native';
import {Path, useGetAllPathsLazyQuery} from './../../graphql/types.d';
import {usePathContext, PathTypes} from './../../contexts/path';

const TAB_LINKS = [
  {id: GetUniqueId(), label: 'Todos', active: true},
  {id: GetUniqueId(), label: 'Tecnologia'},
  {id: GetUniqueId(), label: 'Soft skills'},
  {id: GetUniqueId(), label: 'Marketing'},
  {id: GetUniqueId(), label: 'Design'},
] as Array<ETabLinks>;

// List empty data
const ListEmpty = () => {
  return (
    <View>
      <Text center>Não publicações disponiveis</Text>
    </View>
  );
};

// Principal component
const ExplorerScreen: React.FC = () => {
  const {state, dispatch} = usePathContext();
  const navigation = useNavigation<AppScreenNavigationProp>();
  const [allPathsData, setAllPathsData] = useState<Array<Path>>([]);
  const [currentTab, setCurrentTab] = useState<ETabLinks>(TAB_LINKS[0]);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);
  const [isNoMorePaths, setIsNoMorePaths] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const onTabLinkPress = (link: ETabLinks) => {
    setCurrentTab(link);
  };
  const [
    getAllPaths,
    {data, loading, error, refetch, fetchMore, updateQuery, called},
  ] = useGetAllPathsLazyQuery();
  // Effects
  useEffect(() => {
    R.isEmpty(allPathsData) && getAllPaths();
  }, [allPathsData, getAllPaths]);

  useEffect(() => {
    if (updateQuery) {
      console.log('updateQuery');
    }
    if (called) {
      console.log('called');
    }
  }, [updateQuery, called]);

  // useEffect(() => {
  //   refetch && refetch();
  // }, [refetch, isRefetch]);

  useEffect(() => {
    if (fetchMore && loadMore && snapshot && !isNoMorePaths) {
      fetchMore({
        variables: {lastPath: snapshot},
        // updateQuery: (previousResult, {fetchMoreResult}) => {
        //   console.log('updateQuery fetchMoreResult: ', fetchMoreResult);
        //   console.log('updateQuery previousResult: ', previousResult);
        //   return true;
        // },
      });
    }
  }, [snapshot, loadMore]);

  useEffect(() => {
    if (data?.getAllPaths?.__typename === 'GetPaths') {
      const allPaths: Array<any> = [...(data.getAllPaths.allPaths || [])];
      console.log('data?.getAllPaths', allPaths);
      setIsNoMorePaths(R.isEmpty(allPaths));
      setLoadMore(false);
      setSnapshot(null);
      setAllPathsData([...(!isRefetch ? allPathsData : []), ...allPaths]);
      setIsRefetch(false);
    } else if (data?.getAllPaths?.__typename === 'ErrorResponse') {
      Alert.alert('Aconteceu um erro', `${data.getAllPaths.error.message}`);
    }
  }, [data]);
  // End effects

  // Handlers
  const handlefetchMoreData = () => {
    if (
      !loadMore &&
      !snapshot &&
      !isNoMorePaths &&
      allPathsData.length === LIMIT_PER_PAGE
    ) {
      console.log(`handlefetchMoreData > ${LIMIT_PER_PAGE}`);
      const lastPath = R.last(allPathsData)?.id;
      setLoadMore(true);
      setSnapshot(lastPath || null);
    }
  };

  const handleRefresh = () => {
    // setAllPostsData([]);
    setIsNoMorePaths(false);
    setLoadMore(false);
    setIsRefetch(true);
    refetch && refetch();
  };
  // End handlers

  // Callbacks
  const keyExtractor = useCallback(
    ({id}: Path) => `explorer-path-${id || GetUniqueId()}`,
    [],
  );

  const CourseItem = useCallback(({item}: {item: Path}) => {
    return (
      <View>
        <Separator size="large" />
        <GuupCourseCard
          type="PATH"
          imageUri={item.photoURL || ''}
          title={item.title || 'Guup course'}
          content="12 conteudos"
          owner={item.ownerProfile || {}}
          owners={item.owners}
          onPress={() => {
            dispatch({type: PathTypes.SET_CURRENT_PATH, payload: item});
            navigation.navigate('GuupCourseDetail', {mode: 'ONLY_VIEW'});
          }}
        />
      </View>
    );
  }, []);

  const ListHeader = useCallback(
    () => (
      <ExplorerHeader>
        <ExplorerAction>
          <GuupHeader
            leftRenderIntem={<Icon source="guup" />}
            rightRenderIntem={
              <Link
                preset="simple"
                onPress={() => navigation.navigate('GuupContentCreate')}>
                {/* onPress={() => setToggleModal(!toggleModal)}> */}
                Criar +
              </Link>
            }
          />
          <Separator size="tiny" />
          <ExplorerTitle>
            <Text preset="largePrice">Confira os conteudos disponiveis</Text>
          </ExplorerTitle>
          <Separator size="large" />
          <TabLink
            onPress={onTabLinkPress}
            links={TAB_LINKS}
            active={currentTab}
          />
        </ExplorerAction>
      </ExplorerHeader>
    ),
    [currentTab],
  );

  const ListLoadMore = useCallback(() => {
    if (loadMore) {
      return (
        <ExplorerEmpty>
          <Separator size="lili" />
          <ActivityIndicator />
          <Separator size="extraLarge" />
        </ExplorerEmpty>
      );
    }
    return <Separator size="large" />;
  }, [loadMore]);
  // End callbacks

  // Branchs
  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>error</Text>
      </View>
    );
  }
  // End branchs

  return (
    <Container safe>
      <ExplorerContainer>
        <ExplorerHeaderPatch />
        {allPathsData && (
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={!!allPathsData}
            data={allPathsData}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={20}
            nestedScrollEnabled
            renderItem={CourseItem}
            ListEmptyComponent={ListEmpty}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListLoadMore}
            onEndReachedThreshold={0.9}
            onEndReached={handlefetchMoreData}
            refreshing={loading}
            onRefresh={handleRefresh}
          />
        )}
      </ExplorerContainer>
      <Popover
        visible={toggleModal}
        toggle={() => setToggleModal(!toggleModal)}>
        <GuupCard
          title="Criar um topico"
          description="Crie um espaço para compartilhar conteudo de um tema especifico entre amigos e colegas de trabalho"
          onPress={() => {
            setToggleModal(!toggleModal);
            navigation.navigate('GuupContentCreate');
          }}
        />
        <Separator size="medium" />
        <GuupCard
          title="Criar um conteudo"
          description="Crie um conteudo e compartilhe seu conhecimento com seu amigos e colegas de trabalho"
          onPress={() =>
            Alert.alert('Create collection', 'Create some collections')
          }
        />
      </Popover>
    </Container>
  );
};

export default ExplorerScreen;
