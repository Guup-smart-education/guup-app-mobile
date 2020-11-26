import React, {ReactChild} from 'react';
import {Alert, View} from 'react-native';
import {Icon, Text, Action} from './../../ui';
import {
  HeaderContainer,
  HeaderLeftItem,
  HeaderCenterRenderItem,
  HeaderRightItem,
} from './_styled';

export enum EHeaderType {
  'back' = 'back',
  'backTitle' = 'backTitle',
  'guup' = 'guup',
  'guupAction' = 'guupAction',
}

interface IGuupHeader {
  readonly leftRenderIntem?: ReactChild;
  readonly rightRenderIntem?: ReactChild;
  readonly centerRenderItem?: ReactChild;
  readonly type?: keyof typeof EHeaderType;
  readonly loading?: boolean;
  readonly hasBack?: boolean;
  readonly hasGuupIcon?: boolean;
  readonly isDarkTheme?: boolean;
  readonly title?: string;
  readonly onLeftPress?: () => void;
}

export default ({
  rightRenderIntem,
  hasBack,
  hasGuupIcon,
  onLeftPress,
  loading,
  title,
  isDarkTheme = false,
}: IGuupHeader) => {
  return (
    <HeaderContainer>
      <HeaderLeftItem>
        {hasBack && !hasGuupIcon && (
          <Action onPress={() => !loading && onLeftPress && onLeftPress()}>
            <Icon
              source="back"
              tintColor={isDarkTheme ? 'ligth' : 'ultraDark'}
            />
          </Action>
        )}
        {!hasBack && hasGuupIcon && (
          <Action onPress={() => Alert.alert('Guup press', 'Guup icon press')}>
            <View style={{marginRight: 10}}>
              <Icon source="guup" size="small" />
            </View>
          </Action>
        )}
        {title && (
          <Text preset="header" color={isDarkTheme ? 'ligth' : 'ultraDark'}>
            {title}
          </Text>
        )}
      </HeaderLeftItem>
      <HeaderRightItem>{rightRenderIntem}</HeaderRightItem>
    </HeaderContainer>
  );
};
