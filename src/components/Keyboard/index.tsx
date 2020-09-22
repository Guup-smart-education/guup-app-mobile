import React, {ReactNode, useState, useEffect, useContext} from 'react';
import {Platform, Keyboard} from 'react-native';
import {KeyboardContainer, KeyboardDismiss, KeyboardBlock} from './_styled';
import {hasNotch} from 'react-native-device-info';
import {ThemeContext} from 'styled-components/native';

interface IProps {
  children: ReactNode;
  hasKeyboardDismiss?: boolean;
  paddingPageSheet?: boolean;
}

export default ({
  hasKeyboardDismiss = true,
  paddingPageSheet = false,
  children,
}: IProps) => {
  const theme = useContext(ThemeContext);
  const [paddingVertical, setPaddingVertical] = useState(
    theme.device.header.ios.simple,
  );
  useEffect(() => {
    const iphoneX = hasNotch();
    if (iphoneX && Platform.OS === 'ios') {
      setPaddingVertical(theme.device.header.ios.notch);
    }
  }, [setPaddingVertical, theme]);
  return (
    <KeyboardContainer
      {...(() => {
        return paddingPageSheet
          ? {
              keyboardVerticalOffset: paddingVertical + 10,
            }
          : {};
      })()}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <KeyboardDismiss
        onPress={hasKeyboardDismiss ? Keyboard.dismiss : () => {}}>
        <KeyboardBlock>{children}</KeyboardBlock>
      </KeyboardDismiss>
    </KeyboardContainer>
  );
};
