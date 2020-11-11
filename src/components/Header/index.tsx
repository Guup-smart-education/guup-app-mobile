import React, {ReactChild} from 'react';
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
}

export default ({
  leftRenderIntem,
  rightRenderIntem,
  centerRenderItem,
}: IGuupHeader) => {
  return (
    <HeaderContainer>
      <HeaderLeftItem>{leftRenderIntem}</HeaderLeftItem>
      {centerRenderItem && (
        <HeaderCenterRenderItem>{centerRenderItem}</HeaderCenterRenderItem>
      )}
      <HeaderRightItem>{rightRenderIntem}</HeaderRightItem>
    </HeaderContainer>
  );
};
