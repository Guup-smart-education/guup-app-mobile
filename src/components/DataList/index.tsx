import React, {useCallback} from 'react';
import {FlatList, View, ActivityIndicator, FlatListProps} from 'react-native';
import {GetUniqueId} from './../../helper';
import {Separator, Text} from './../../ui';
import {DataEmpty} from './_styled';

interface IDataList {
  readonly data?: Array<any>;
  readonly renderItem?: any;
  readonly listHeader?: any;
  readonly refreshing?: boolean;
  readonly isNoMoreData?: boolean;
  readonly loadMore?: boolean;
  readonly handlefetchMoreData?: () => void;
  readonly handleRefresh?: () => void;
}

const DataList: React.FC<IDataList> = ({
  data,
  renderItem,
  listHeader,
  refreshing,
  loadMore,
  isNoMoreData,
  handlefetchMoreData,
  handleRefresh,
}) => {
  const options: FlatListProps<{}> = {
    onEndReachedThreshold: 0.9,
    maxToRenderPerBatch: 20,
    nestedScrollEnabled: true,
    showsVerticalScrollIndicator: false,
    data,
    renderItem,
  };
  const keyExtractor = useCallback(() => `explorer-path-${GetUniqueId()}`, []);
  const listEmpty = useCallback(() => {
    return (
      <View>
        <Text center>Não publicações disponiveis</Text>
      </View>
    );
  }, []);
  const listLoadMore = useCallback(() => {
    if (loadMore && !isNoMoreData) {
      return (
        <DataEmpty>
          <Separator size="lili" />
          <ActivityIndicator />
          <Separator size="extraLarge" />
        </DataEmpty>
      );
    }
    return <Separator size="large" />;
  }, [loadMore, isNoMoreData]);
  return (
    <FlatList
      scrollEnabled={!!data}
      keyExtractor={keyExtractor}
      ListEmptyComponent={listEmpty}
      ListHeaderComponent={listHeader}
      ListFooterComponent={listLoadMore}
      onEndReached={handlefetchMoreData}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      {...options}
    />
  );
};

export default DataList;
