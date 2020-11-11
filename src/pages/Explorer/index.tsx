/* eslint-disable react-hooks/exhaustive-deps */
import R from 'ramda';
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  Alert,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
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
  ExplorerTabs,
} from './_styled';
import {ETabLinks} from './../../@types/tablink';
import {AppScreenNavigationProp} from './../../@types/app.navigation';
import {GetUniqueId, shadowStyle} from './../../helper';
import {LIMIT_PER_PAGE} from './../../constants';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {
  Path,
  useGetAllPathsLazyQuery,
  Course,
  useGetCoursesLazyQuery,
} from './../../graphql/types.d';
import {usePathContext, PathTypes} from './../../contexts/path';
import AuthContext from './../../contexts/auth';

enum TABS {
  'collections' = 'collections',
  'courses' = 'courses',
}

const TAB_LINKS = [
  // {id: GetUniqueId(), name: TABS.collections, label: 'Coleções', active: true},
  {id: GetUniqueId(), name: 'tech', label: 'Conteudos', active: true},
  {id: GetUniqueId(), name: 'rrhh', label: 'Recursos humanos', active: true},
  {id: GetUniqueId(), name: 'design', label: 'Desenho', active: true},
  {id: GetUniqueId(), name: 'marketing', label: 'Marketing', active: true},
  {id: GetUniqueId(), name: 'bussiness', label: 'Negocios', active: true},
  {id: GetUniqueId(), name: 'people', label: 'Pessoas', active: true},
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
  const navigation = useNavigation<AppScreenNavigationProp>();
  const [allPathsData, setAllPathsData] = useState<Array<Path>>([]);
  const [allCourseData, setAllCoursesData] = useState<Array<Path>>([]);
  const [currentTab, setCurrentTab] = useState<ETabLinks>(TAB_LINKS[0]);
  const [currentData, setCurrentData] = useState<string>(TABS.courses);
  const [toggleData, setToggleData] = useState<boolean>(false);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);
  const [isNoMoreData, setIsNoMoreData] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const onTabLinkPress = (link: ETabLinks) => {
    // setCurrentData(link.name);
    // setToggleData(!toggleData);
    setCurrentTab(link);
  };
  const [
    getAllPaths,
    {
      data: dataPaths,
      loading: loadingPaths,
      error: errorPaths,
      refetch: refetchPaths,
      fetchMore: fetchMorePaths,
    },
  ] = useGetAllPathsLazyQuery();
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
    if (currentData === TABS.collections && R.isEmpty(allPathsData)) {
      getAllPaths();
    } else if (currentData === TABS.courses && R.isEmpty(allCourseData)) {
      getAllCourses();
    }
  }, [getAllPaths, getAllCourses, currentData, allCourseData, allPathsData]);

  useEffect(() => {
    if (isFocused) {
      setIsRefetch(true);
      if (currentData === TABS.collections) {
        refetchPaths && refetchPaths();
      } else if (currentData === TABS.courses) {
        refetchCourses && refetchCourses();
      }
    }
  }, [refetchPaths, refetchCourses, isFocused]);

  useEffect(() => {
    if (loadMore && snapshot && !isNoMoreData) {
      if (currentData === TABS.collections) {
        fetchMorePaths &&
          fetchMorePaths({
            variables: {lastPath: snapshot},
          });
      } else {
        fetchMoreCourses &&
          fetchMoreCourses({
            variables: {
              lastCourse: snapshot,
            },
          });
      }
    }
  }, [snapshot, loadMore]);

  useEffect(() => {
    if (dataPaths?.getAllPaths?.__typename === 'GetPaths') {
      const allPaths: Array<any> = [...(dataPaths.getAllPaths.allPaths || [])];
      const unionPaths = R.union(
        [...(!isRefetch ? allPathsData : [])],
        [...allPaths],
      );
      // setAllData([...allPaths]);
      setAllPathsData(unionPaths);
      setIsNoMoreData(allPaths.length < LIMIT_PER_PAGE);
      setIsRefetch(false);
      setLoadMore(false);
      setSnapshot(null);
    } else if (dataPaths?.getAllPaths?.__typename === 'ErrorResponse') {
      Alert.alert(
        'Aconteceu um erro',
        `${dataPaths.getAllPaths.error.message}`,
      );
    }
  }, [dataPaths]);

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
      setIsNoMoreData(allCourses.length < LIMIT_PER_PAGE);
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
    console.log('handlefetchMoreData');
    if (!loadMore && !snapshot && !isNoMoreData) {
      if (
        currentData === TABS.collections &&
        allPathsData.length >= LIMIT_PER_PAGE
      ) {
        const lastPath = R.last(allPathsData)?.id;
        setSnapshot(lastPath || null);
      } else if (
        currentData === TABS.courses &&
        allCourseData.length >= LIMIT_PER_PAGE
      ) {
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
    if (currentData === TABS.collections) {
      refetchPaths && refetchPaths();
    } else {
      refetchCourses && refetchCourses();
    }
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
          imageUri={item.photoURL || ''}
          title={item.title || 'Guup course'}
          description={item.description || ''}
          owner={item.ownerProfile || {}}
          onPress={() => {
            Alert.alert('Video', 'Stream video');
          }}
        />
        <Separator size="tiny" />
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
                onPress={() =>
                  navigation.navigate('GuupContentCreate', {path: undefined})
                }>
                {/* onPress={() => setToggleModal(!toggleModal)}> */}
                <Icon source="plus" />
              </Link>
            }
          />
          <Separator size="tiny" />
          <ExplorerTitle>
            <Text preset="largePrice">Confira os conteudos disponiveis</Text>
          </ExplorerTitle>
        </ExplorerAction>
        <Separator size="large" />
        <ExplorerTabs horizontal showsHorizontalScrollIndicator={false}>
          <TabLink
            onPress={onTabLinkPress}
            links={TAB_LINKS}
            active={currentTab}
          />
        </ExplorerTabs>
      </ExplorerHeader>
    ),
    [currentTab],
  );

  const ListLoadMore = useCallback(() => {
    if (loadMore && !isNoMoreData) {
      return (
        <ExplorerEmpty>
          <Separator size="lili" />
          <ActivityIndicator />
          <Separator size="extraLarge" />
        </ExplorerEmpty>
      );
    }
    return <Separator size="large" />;
  }, [loadMore, isNoMoreData]);
  // End callbacks

  // Branchs
  if (loadingPaths || loadingCourses) {
    return (
      <Container dark>
        <ActivityIndicator size="small" />
      </Container>
    );
  }
  if (errorPaths || errorCourses) {
    return (
      <Container dark>
        <Text color="primary">error</Text>
      </Container>
    );
  }
  // End branchs

  return (
    <>
      <Container dark>
        <ExplorerContainer>
          {/* <ExplorerHeaderPatch /> */}
          <FlatList
            pagingEnabled
            // style={{
            //   height: Dimensions.get('screen').height,
            //   backgroundColor: '#Fc2',
            // }}
            showsVerticalScrollIndicator={false}
            // scrollEnabled={!!allData}
            data={
              currentData === TABS.collections ? allPathsData : allCourseData
            }
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={20}
            nestedScrollEnabled
            renderItem={CourseItem}
            ListEmptyComponent={ListEmpty}
            // ListHeaderComponent={ListHeader}
            // ListFooterComponent={ListLoadMore}
            onEndReachedThreshold={0.9}
            onEndReached={handlefetchMoreData}
            refreshing={loadingPaths || loadingCourses}
            onRefresh={handleRefresh}
          />
        </ExplorerContainer>
      </Container>
      <ExplorerHeader style={shadowStyle.newPost}>
        <ExplorerAction>
          <GuupHeader
            leftRenderIntem={<Icon source="guup" size="small" />}
            rightRenderIntem={
              <Link
                color="ligth"
                preset="simple"
                onPress={() =>
                  navigation.navigate('GuupContentCreate', {path: undefined})
                }>
                {/* onPress={() => setToggleModal(!toggleModal)}> */}
                {/* <Icon source="plus" blur tintColor="ligth" /> */}
                Criar conteudo +
              </Link>
            }
          />
        </ExplorerAction>
      </ExplorerHeader>
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
