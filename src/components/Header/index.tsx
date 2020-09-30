import React, {ReactChild} from 'react';
import {HeaderContainer, HeaderLeftItem, HeaderRightItem} from './_styled';

export enum EHeaderType {
  'back' = 'back',
  'backTitle' = 'backTitle',
  'guup' = 'guup',
  'guupAction' = 'guupAction',
}

interface IGuupHeader {
  readonly leftRenderIntem?: ReactChild;
  readonly rightRenderIntem?: ReactChild;
  readonly type?: keyof typeof EHeaderType;
}

export default ({leftRenderIntem, rightRenderIntem}: IGuupHeader) => {
  return (
    <HeaderContainer>
      {leftRenderIntem && <HeaderLeftItem>{leftRenderIntem}</HeaderLeftItem>}
      {rightRenderIntem && (
        <HeaderRightItem>{rightRenderIntem}</HeaderRightItem>
      )}
    </HeaderContainer>
  );
};
