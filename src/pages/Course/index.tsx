/* eslint-disable react-hooks/exhaustive-deps */
import R from 'ramda';
import React, {useState, useEffect, useCallback, useContext} from 'react';
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
  Button,
} from './../../ui';
import {
  Avatar,
  GuupCourseCard,
  GuupHeader,
  Popover,
  GuupMenuList,
} from './../../components';
import {
  CourseDetailContainer,
  CourseDetailHeader,
  CourseDetailContent,
  CourseDetailDataBody,
  CourseDetailDataBottom,
  CourseDetailDataRight,
  CourseDetailDataLeft,
  CourseDetailDataContent,
  CourseDetailItem,
  CourseListFooter,
} from './_styled';
import {useIsFocused} from '@react-navigation/native';
import {CourseDetailPropsApp} from './../../@types/app.navigation';
import {usePathContext} from './../../contexts/path';
import AuthContext from './../../contexts/auth';
import {
  useGetCoursesByPathLazyQuery,
  Course,
  PathAccess,
} from './../../graphql/types.d';
import {GetUniqueId, shadowStyle} from './../../helper';
import {LIMIT_LIST} from './../../constants';
import {IMenuItemProps} from './../../@types/menu.item';

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
  const OPTIONS_ITEMS: Array<IMenuItemProps> =
    mode === 'EDIT'
      ? [
          {
            text: 'Remover conteudo',
            onPress: () => Alert.alert('Remover!!', 'Ver mais tarde'),
            icon: 'trash',
          },
          {
            text: 'Deixar público ao mundo',
            onPress: () => Alert.alert('Publicar!!', 'Publicar'),
            icon: 'explorer',
          },
          {
            text: 'Editar conteudo',
            onPress: () => Alert.alert('Editar!!', 'Ver mais tarde'),
            icon: 'settings',
          },
        ]
      : [
          {
            text: 'Ver mais tarde',
            onPress: () => Alert.alert('Ver!!', 'Ver mais tarde'),
            icon: 'save',
          },
          {
            text: 'Me avise de novo conteudo',
            onPress: () => Alert.alert('Ver!!', 'Ver mais tarde'),
            icon: 'bell',
          },
          {
            text: 'Reportar conteudo',
            onPress: () => Alert.alert('Report!!', 'Reportar'),
            icon: 'alert',
          },
        ];
  const isFocused = useIsFocused();
  const [allCourses, setAllCourses] = useState<Array<Course>>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showPermission, setShowPermission] = useState<boolean>(false);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);
  const [isNoMoreData, setIsNoMoreData] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const {
    state: {currentPath},
  } = usePathContext();
  const {user} = useContext(AuthContext);
  const [
    getCourses,
    {data, error, loading, refetch, fetchMore},
  ] = useGetCoursesByPathLazyQuery();

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
    if (refetch && isFocused) {
      setIsRefetch(true);
      refetch();
    }
  }, [refetch, isFocused]);
  useEffect(() => {
    if (fetchMore && loadMore && snapshot && !isNoMoreData) {
      fetchMore({
        variables: {
          path: currentPath.id || '',
          lastCourse: snapshot,
        },
      });
    }
  }, [snapshot, loadMore]);
  useEffect(() => {
    setAllCourses([]);
    if (data?.getCoursesByPath?.__typename === 'GetCoursesByPath') {
      const coursesData: Array<any> = [
        ...(data.getCoursesByPath.coursesByPath?.filter(
          (item) => item?.path === currentPath.id,
        ) || []),
      ];
      const unionData = R.union(
        [...(!isRefetch ? allCourses : [])],
        [...coursesData],
      );
      setAllCourses(unionData);
      setIsNoMoreData(coursesData.length < LIMIT_LIST.tiny);
      setIsRefetch(false);
      setLoadMore(false);
      setSnapshot(null);
    } else if (data?.getCoursesByPath?.__typename === 'ErrorResponse') {
      Alert.alert(
        'Aconteceu um problema',
        data.getCoursesByPath.error.message ||
          'Ops!! Aconteceu um problema com a chamda, tente novamente',
      );
    }
    return () => {
      setAllCourses([]);
    };
  }, [data]);
  useEffect(() => {
    if (error) {
      Alert.alert('Aconteceu um problema', 'Oops!! Aconteceu um problema');
    }
  }, [error]);
  // End effects
  // Handlers
  const handleRefresh = () => {
    // setAllPostsData([]);
    setIsNoMoreData(false);
    setLoadMore(false);
    setIsRefetch(true);
    refetch && refetch();
  };
  const handlefetchMoreData = () => {
    if (
      !loadMore &&
      !snapshot &&
      !isNoMoreData &&
      allCourses.length >= LIMIT_LIST.tiny
    ) {
      const lastPath = R.last(allCourses)?.id;
      setLoadMore(true);
      setSnapshot(lastPath || null);
    }
  };
  // End handlers
  // Callbacks
  const keyExtractor = useCallback(
    ({id}: Course) => `course-detail-item-${id || GetUniqueId()}`,
    [],
  );

  const CourseItem = useCallback(({item}: {item: Course}) => {
    const isOwner = user?.uid === item.owner;
    return (
      <CourseDetailItem style={shadowStyle.newPost}>
        <Separator size="large" />
        <GuupCourseCard
          id={`${item.id}`}
          type="COURSE"
          model={isOwner ? 'OWNER' : 'PUBLIC'}
          imageUri={item.photoURL || ''}
          title={item.title || 'Guup course'}
          owner={item.ownerProfile || {}}
          contentType="Video"
          createdAt={item.createdAt || ''}
          onPress={() =>
            Alert.alert('Show the course', 'Show all video course')
          }
        />
      </CourseDetailItem>
    );
  }, []);

  const ListHeader = useCallback(() => {
    return (
      <CourseDetailDataContent style={shadowStyle.newPost}>
        <CourseDetailDataBody>
          <CourseDetailDataRight>
            <Text preset="largePrice">{currentPath.title}</Text>
            <Separator size="small" />
            <TouchArea
              onPress={() => navigate('GuupUserProfile', {type: 'PUBLIC'})}>
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
            <Action onPress={() => setShowOptions(true)}>
              <Icon source="dots" backColor="veryLigthGrey" />
            </Action>
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
    if (allCourses && allCourses?.length >= LIMIT_LIST.tiny) {
      return (
        <CourseListFooter>
          <Button
            loading={loading || loadMore}
            disable={loading || loadMore || isNoMoreData}
            onPress={() => handlefetchMoreData()}
            text={isNoMoreData ? 'Não há mais conteudo' : 'trazer mais'}
          />
        </CourseListFooter>
      );
    }
    return <Separator size="large" />;
  }, [loadMore, allCourses]);

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
                onPress={() => {
                  if (
                    mode === 'EDIT' ||
                    currentPath.access === PathAccess.ForEveryone
                  ) {
                    navigate('GuupContentCreate', {
                      type: 'CONTENT',
                      ...(currentPath.id && {path: currentPath.id}),
                    });
                  } else if (currentPath.access === PathAccess.LimitAccess) {
                    setShowPermission(true);
                  }
                }}>
                {mode === 'EDIT' ? 'Adicionar +' : 'Contribuir +'}
              </Link>
            }
          />
        </CourseDetailHeader>
        <CourseDetailContent>
          <FlatList
            style={{width: '100%', height: '100%'}}
            showsVerticalScrollIndicator={false}
            data={allCourses}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={20}
            nestedScrollEnabled
            renderItem={CourseItem}
            ListEmptyComponent={ListEmpty}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListLoadMore}
            onEndReachedThreshold={0.9}
            refreshing={loading}
            onRefresh={handleRefresh}
          />
        </CourseDetailContent>
      </CourseDetailContainer>
      <Popover
        visible={showOptions}
        height={50 + OPTIONS_ITEMS.length * 44}
        toggle={() => setShowOptions(false)}>
        <GuupMenuList menuItems={OPTIONS_ITEMS} hideChevron compress noBorder />
      </Popover>
      <Popover
        visible={showPermission}
        height={50 + 4 * 48}
        toggle={() => setShowPermission(false)}
        closeBottom={false}>
        <>
          <Text preset="comment" bold underline>
            Coleção privada
          </Text>
          <Separator size="tiny" />
          <Text>
            Solicite permissão ao dono da coleção para poder contribuir com
            conteudos novos
          </Text>
          <Separator size="medium" />
          <Button
            text="solicitar acesso"
            onPress={() => Alert.alert('Solicitar', 'Soliciar acesso')}
          />
        </>
      </Popover>
    </Container>
  );
};

export default CourseScreen;
