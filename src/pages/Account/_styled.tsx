import styled from 'styled-components/native';

export const AccountContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const AccountHeader = styled.View`
  padding-left: ${({theme}) => theme.spacing[25]};
  padding-right: ${({theme}) => theme.spacing[25]};
`;

export const AccountInformation = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AccountUserName = styled.View`
  flex: 1;
  padding-left: ${({theme}) => theme.spacing[15]};
`;

export const AccountUserAvatar = styled.ImageBackground`
  height: 44px;
  width: 44px;
  border-radius: 22px;
  overflow: hidden;
`;

export const AccountUserDescription = styled.View`
  padding-bottom: ${({theme}) => theme.spacing[30]};
`;

export const AccountBody = styled.View`
  flex: 1;
  width: 100%;
`;
export const AccountFooter = styled.View`
  padding-left: ${({theme}) => theme.spacing[25]};
  padding-right: ${({theme}) => theme.spacing[25]};
  padding-bottom: ${({theme}) => theme.spacing[25]};
  width: 100%;
`;
