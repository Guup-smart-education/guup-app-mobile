/* eslint-disable react-hooks/exhaustive-deps */
import R from 'ramda';
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {Alert, View, FlatList, ActivityIndicator} from 'react-native';
import {Container, Text, Link, Icon, Separator} from './../../ui';
import {
  GuupHeader,
  TabLink,
  GuupCourseCard,
  Popover,
  GuupCard,
  GuupDataList,
} from './../../components';
import {
  ExplorerContainer,
  ExplorerHeader,
  ExplorerAction,
  ExplorerTitle,
  ExplorerHeaderPatch,
  ExplorerEmpty,
  ExplorerCourseItem,
} from './_styled';
import {ETabLinks} from './../../@types/tablink';
import {AppScreenNavigationProp} from './../../@types/app.navigation';
import {GetUniqueId, shadowStyle} from './../../helper';
import {LIMIT_PER_PAGE} from './../../constants';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {Course, Path, useGetAllPathsLazyQuery} from './../../graphql/types.d';
import {usePathContext, PathTypes} from './../../contexts/path';
import AuthContext from './../../contexts/auth';

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
  const isFocused = useIsFocused();
  const {state, dispatch} = usePathContext();
  const {user} = useContext(AuthContext);
  const [createOptionsSize, setCreateOptionsSize] = useState<{
    height: number;
    width: number;
  }>({
    height: 0,
    width: 0,
  });
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
    {data, loading, error, refetch, fetchMore},
  ] = useGetAllPathsLazyQuery();
  // Effects
  useEffect(() => {
    R.isEmpty(allPathsData) && getAllPaths();
  }, [allPathsData, getAllPaths]);

  useEffect(() => {
    if (refetch && isFocused) {
      setIsRefetch(true);
      refetch();
    }
  }, [refetch, isFocused]);

  useEffect(() => {
    if (fetchMore && loadMore && snapshot && !isNoMorePaths) {
      fetchMore({
        variables: {lastPath: snapshot},
      });
    }
  }, [snapshot, loadMore]);

  useEffect(() => {
    if (data?.getAllPaths?.__typename === 'GetPaths') {
      const allPaths: Array<any> = [...(data.getAllPaths.allPaths || [])];
      const unionPaths = R.union(
        [...(!isRefetch ? allPathsData : [])],
        [...allPaths],
      );
      // setAllPathsData([...allPaths]);
      setAllPathsData(unionPaths);
      setIsNoMorePaths(allPaths.length < LIMIT_PER_PAGE);
      setIsRefetch(false);
      setLoadMore(false);
      setSnapshot(null);
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
      allPathsData.length >= LIMIT_PER_PAGE
    ) {
      const lastPath = R.last(allPathsData)?.id;
      setLoadMore(true);
      setSnapshot(lastPath || null);
    }
  };

  const handleRefresh = () => {
    // setIsNoMorePaths(false);
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
    const isOwner = user?.uid === item.owner;
    return (
      <ExplorerCourseItem style={shadowStyle.newPost}>
        <Separator size="large" />
        <GuupCourseCard
          id={`${item.id}`}
          type="PATH"
          model={isOwner ? 'OWNER' : 'PUBLIC'}
          imageUri={item.photoURL || ''}
          title={item.title || 'Guup course'}
          content={`${item.contentCount || 0} conteudos`}
          owner={item.ownerProfile || {}}
          owners={item.owners}
          onPress={() => {
            dispatch({type: PathTypes.SET_CURRENT_PATH, payload: item});
            navigation.navigate('GuupCourseDetail', {
              mode: isOwner ? 'EDIT' : 'ONLY_VIEW',
            });
          }}
        />
      </ExplorerCourseItem>
    );
  }, []);

  const ListHeader = useCallback(
    () => (
      <ExplorerHeader style={shadowStyle.newPost}>
        <ExplorerAction>
          <GuupHeader
            leftRenderIntem={<Icon source="guup" size="small" />}
            rightRenderIntem={
              <Link
                preset="simple"
                // onPress={() => navigation.navigate('GuupContentCreate')}>
                onPress={() => setToggleModal(!toggleModal)}>
                <Icon source="plus" />
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
    if (loadMore && !isNoMorePaths) {
      return (
        <ExplorerEmpty>
          <Separator size="lili" />
          <ActivityIndicator />
          <Separator size="extraLarge" />
        </ExplorerEmpty>
      );
    }
    return <Separator size="large" />;
  }, [loadMore, isNoMorePaths]);
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
    <>
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
