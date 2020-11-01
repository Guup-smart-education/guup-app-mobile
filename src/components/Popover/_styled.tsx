import styled from 'styled-components/native';

export const PopoverContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;

// export const PopoverOverlay = styled.View`
//   position: absolute;
//   background-color: ${({theme}) => theme.colors.ultraDark};
//   opacity: 0.4;
//   height: 100%;
//   width: 100%;
// `;

export const PopoverContent = styled.View`
  background-color: ${({theme}) => theme.colors.ligth};
  border-top-left-radius: ${({theme}) => theme.borderRadius[8]};
  border-top-right-radius: ${({theme}) => theme.borderRadius[8]};
  /* max-height: 55%; */
  width: 100%;
  padding-left: ${({theme}) => theme.spacing[25]};
  padding-right: ${({theme}) => theme.spacing[25]};
  padding-bottom: ${({theme}) => theme.spacing[25]};
  padding-top: ${({theme}) => theme.spacing[5]};
`;

export const PopoverHeader = styled.View`
  padding-bottom: ${({theme}) => theme.spacing[10]};
  padding-top: ${({theme}) => theme.spacing[15]};
  align-items: center;
  justify-content: center;
`;

export const PopoverBody = styled.View`
  /* flex-grow: 1; */
  padding-bottom: ${({theme}) => theme.spacing[15]};
  padding-top: ${({theme}) => theme.spacing[15]};
`;

export const PopoverFooter = styled.View`
  padding-bottom: ${({theme}) => theme.spacing[15]};
  padding-top: ${({theme}) => theme.spacing[15]};
`;

// export const PopoverBarClose = styled.View`
//   height: 6px;
//   width: 50px;
//   background-color: ${({theme}) => theme.colors.ligthGrey};
//   border-radius: 3px;
// `;
