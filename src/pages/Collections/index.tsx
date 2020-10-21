/* eslint-disable react-hooks/exhaustive-deps */
import R from 'ramda';
import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, View, Alert, ActivityIndicator} from 'react-native';
import {
  Container,
  Text,
  Icon,
  Action,
  Separator,
  Link,
  RowFullWidth,
} from './../../ui';
import {GuupHeader, GuupCourseCard} from './../../components';
import {PropsApp} from './../../@types/app.navigation';
import {
  CollectionsContainer,
  CollectionsHeader,
  CollectionsBody,
} from './_styled';
import {useGetPathsByOwnerLazyQuery, Path} from './../../graphql/types.d';
import {GetUniqueId} from './../../helper';
import {LIMIT_PER_PAGE} from './../../constants';
import {usePathContext, PathTypes} from './../../contexts/path';

// Component
const Collections: React.FC<PropsApp> = ({navigation: {goBack, navigate}}) => {
  const {state, dispatch} = usePathContext();
  const [
    getPaths,
    {loading, data, error, fetchMore, refetch},
  ] = useGetPathsByOwnerLazyQuery();
  const [allPaths, setAllPaths] = useState<Array<Path>>([]);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);
  const [isNoMorePaths, setIsNoMorePaths] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  // Effects
  useEffect(() => {
    R.isEmpty(allPaths) && getPaths();
  }, [allPaths, getPaths]);

  useEffect(() => {
    if (fetchMore && loadMore && snapshot && !isNoMorePaths) {
      fetchMore({
        variables: {lastPath: snapshot},
      });
    }
  }, [snapshot, loadMore]);

  useEffect(() => {
    if (data?.getPathsByOwner?.__typename === 'GetPathsOwner') {
      const pathsData: Array<any> = [...(data.getPathsByOwner.allPaths || [])];
      console.log('data?.getPathsByOwner', pathsData);
      setIsNoMorePaths(R.isEmpty(allPaths));
      setLoadMore(false);
      setSnapshot(null);
      setAllPaths([...(!isRefetch ? allPaths : []), ...pathsData]);
      setIsRefetch(false);
    } else if (data?.getPathsByOwner?.__typename === 'ErrorResponse') {
      Alert.alert('Aconteceu um erro', `${data.getPathsByOwner.error.message}`);
    }
  }, [data]);
  // End effects
  // Calbacks
  const keyExtractor = useCallback(
    ({id}: Path) => `collection-path-${id || GetUniqueId()}`,
    [],
  );

  const CourseItem = useCallback(
    ({item}: {item: Path}) => {
      return (
        <View>
          <Separator size="large" />
          <GuupCourseCard
            model="OWNER"
            type="PATH"
            imageUri={item.photoURL || ''}
            title={item.title || 'Guup course'}
            content="12 conteudos"
            owner={item.ownerProfile || {}}
            owners={item.owners}
            onPress={() => {
              dispatch({type: PathTypes.SET_CURRENT_PATH, payload: item});
              navigate('GuupCourseDetail', {mode: 'EDIT'});
            }}
          />
        </View>
      );
    },
    [navigate],
  );
  const ListEmpty = useCallback(
    () => (
      <View>
        <Text center>Não colleções disponiveis</Text>
        <Link onPress={() => navigate('GuupContentCreate')}>Criar coleção</Link>
      </View>
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
  // End branchas
  // Handlers
  const handlefetchMoreData = () => {
    if (
      !loadMore &&
      !snapshot &&
      !isNoMorePaths &&
      allPaths.length === LIMIT_PER_PAGE
    ) {
      console.log(`handlefetchMoreData > ${LIMIT_PER_PAGE}`);
      const lastPath = R.last(allPaths)?.id;
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
  return (
    <Container safe light>
      <CollectionsContainer>
        <CollectionsHeader>
          <GuupHeader
            leftRenderIntem={
              <Action onPress={() => goBack()}>
                <Icon source="arrow" />
              </Action>
            }
            centerRenderItem={
              <Text preset="comment" bold>
                Colleções
              </Text>
            }
            rightRenderIntem={
              <Action onPress={() => navigate('GuupContentCreate')}>
                <Icon source="plus" />
              </Action>
            }
          />
        </CollectionsHeader>
        <CollectionsBody>
          <FlatList
            keyExtractor={keyExtractor}
            data={allPaths}
            renderItem={CourseItem}
            showsVerticalScrollIndicator={false}
            scrollEnabled={!!allPaths}
            maxToRenderPerBatch={20}
            nestedScrollEnabled
            ListEmptyComponent={ListEmpty}
            ListFooterComponent={ListLoadMore}
            onEndReachedThreshold={0.9}
            onEndReached={handlefetchMoreData}
            refreshing={loading}
            onRefresh={handleRefresh}
          />
        </CollectionsBody>
      </CollectionsContainer>
    </Container>
  );
};

export default Collections;
