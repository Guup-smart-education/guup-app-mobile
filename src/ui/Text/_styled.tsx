import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {EPreset, IProps} from './';

export const Text = styled.Text<IProps>`
  ${({theme}) => Platform.OS === 'ios' && `font-family: ${theme.fontFamily}`};
  ${({theme, preset}) => {
    switch (preset) {
      case EPreset.tall:
        return `
          ${
            Platform.OS !== 'ios' &&
            `font-family: ${theme.fontFamilyAndroid.light}`
          };
          font-size: ${theme.fontSize.tall};
          font-weight: ${theme.fontWeight.regular};
          line-height: ${theme.spacing.lineHeigth.l24};
          color: ${theme.colors.greyBrown};
          letter-spacing: 0.20px;
        `;
      case EPreset.comment:
        return `
          ${
            Platform.OS !== 'ios' &&
            `font-family: ${theme.fontFamilyAndroid.light}`
          };
          font-size: ${theme.fontSize.regular};
          font-weight: ${theme.fontWeight.regular};
          line-height: ${theme.spacing.lineHeigth.l24};
          color: ${theme.colors.greyBrown};
          letter-spacing: 0.20px;
        `;
      case EPreset.largePrice:
        return `
          ${
            Platform.OS !== 'ios' &&
            `font-family: ${theme.fontFamilyAndroid.bold}`
          };
          font-size: ${theme.fontSize.large};
          font-weight: ${theme.fontWeight.bold};
          letter-spacing: 0.20px;
        `;
      case EPreset.date:
        return `
          ${
            Platform.OS !== 'ios' &&
            `font-family: ${theme.fontFamilyAndroid.regular}`
          };
          font-size: ${theme.fontSize.small};
          letter-spacing: -0.01px;
        `;
      case EPreset.tiny:
        return `
          ${
            Platform.OS !== 'ios' &&
            `font-family: ${theme.fontFamilyAndroid.light}`
          };
          font-size: ${theme.fontSize.tiny};
          letter-spacing: -0.01px;
        `;
      case EPreset.chat:
        return `
          ${
            Platform.OS !== 'ios' &&
            `font-family: ${theme.fontFamilyAndroid.medium}`
          };
          font-size: ${theme.fontSize.medium};
          font-weight: ${theme.fontWeight.medium};
          line-height: ${theme.spacing.lineHeigth.l24};
          letter-spacing: -0.01px;
        `;
      case EPreset.title:
        return `
          ${
            Platform.OS !== 'ios' &&
            `font-family: ${theme.fontFamilyAndroid.heavy}`
          };
          font-size: ${theme.fontSize.bigger};
          font-weight: ${theme.fontWeight.heavy};
          line-height: ${theme.spacing.lineHeigth.l42};
          letter-spacing: -0.2px;
        `;
      case EPreset.subtitle:
        return `
          ${
            Platform.OS !== 'ios' &&
            `font-family: ${theme.fontFamilyAndroid.semiBold}`
          };
          font-size: ${theme.fontSize.large};
          font-weight: ${theme.fontWeight.semiBold};
        `;
      case EPreset.header:
        return `
          ${
            Platform.OS !== 'ios' &&
            `font-family: ${theme.fontFamilyAndroid.semiBold}`
          };
          font-size: ${theme.fontSize.large};
          font-weight: ${theme.fontWeight.bold};
          letter-spacing: ${-0.5}px;
        `;
      case EPreset.paragraph:
        return `
          ${
            Platform.OS !== 'ios' &&
            `font-family: ${theme.fontFamilyAndroid.regular}`
          };
          font-size: ${theme.fontSize.medium};
          font-weight: ${theme.fontWeight.regular};
          line-height: ${theme.spacing.lineHeigth.l24};
          letter-spacing: 0.11px;
        `;
      case EPreset.label:
        return `
          ${
            Platform.OS !== 'ios' &&
            `font-family: ${theme.fontFamilyAndroid.regular}`
          };
          font-size: ${theme.fontSize.small};
          font-weight: ${theme.fontWeight.regular};
        `;
      case EPreset.postComment:
        return `
          ${
            Platform.OS !== 'ios' &&
            `font-family: ${theme.fontFamilyAndroid.regular}`
          };
          font-size: ${theme.fontSize.small};
          font-weight: ${theme.fontWeight.regular};
          line-height: ${theme.spacing.lineHeigth.l21};
        `;
      case EPreset.button:
        return `
          ${
            Platform.OS !== 'ios' &&
            `font-family: ${theme.fontFamilyAndroid.semiBold}`
          };
          font-size: ${theme.fontSize.medium};
          font-weight: ${theme.fontWeight.semiBold};
        `;
      default:
        return `
          ${
            Platform.OS !== 'ios' &&
            `font-family: ${theme.fontFamilyAndroid.regular}`
          };
          font-size: ${theme.fontSize.regular};
          font-weight: ${theme.fontWeight.regular};
        `;
    }
  }};
  ${({center}: IProps) => center && 'text-align: center'};
  ${({underline, theme, color}) =>
    underline &&
    `text-decoration: underline ${theme.colors[color || 'dark']};`};
  color: ${({color, theme}) => theme.colors[color || 'dark']};
  ${({lineHeight}) => lineHeight && `line-height: ${lineHeight}px`};
  ${({bold, theme}) =>
    bold &&
    `
    ${
      Platform.OS !== 'ios' &&
      `font-family: ${theme.fontFamilyAndroid.semiBold}`
    };
    font-weight: ${theme.fontWeight.semiBold};
  `};
  ${({light, theme}) =>
    light &&
    `
    ${Platform.OS !== 'ios' && `font-family: ${theme.fontFamilyAndroid.light}`};
    font-weight: ${theme.fontWeight.ligth};
  `};
  ${({hightline, theme}) =>
    hightline ? `background-color: ${theme.colors[hightline]}` : ''}
`;
