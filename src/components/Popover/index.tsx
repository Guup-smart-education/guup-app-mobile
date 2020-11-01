import React, {
  ReactChildren,
  ReactChild,
  useRef,
  useEffect,
  useContext,
} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ThemeContext} from 'styled-components';
import {Dimensions} from 'react-native';
import {PopoverContent, PopoverBody, PopoverFooter} from './_styled';
import {Button} from './../../ui';

interface IPopover {
  readonly visible: boolean;
  readonly toggle: () => void;
  readonly closeBottom?: boolean;
  readonly children?: ReactChildren | ReactChild;
  readonly height?: number;
}

const Popover = ({
  visible,
  toggle,
  children,
  closeBottom = true,
  height = 0,
}: IPopover) => {
  const theme = useContext(ThemeContext);
  const sheetRef = useRef<RBSheet>();
  useEffect(() => {
    if (sheetRef.current) {
      if (visible) {
        sheetRef.current.open();
      } else {
        sheetRef.current.close();
      }
      sheetRef.current.open();
    }
  }, [visible]);
  return (
    <RBSheet
      ref={sheetRef}
      openDuration={250}
      onClose={toggle}
      height={
        (height || Dimensions.get('screen').height / 1.8) +
        (closeBottom ? 120 : 0)
      }
      closeOnDragDown
      closeOnPressMask
      customStyles={{
        container: {
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
          backgroundColor: theme.colors.ligth,
        },
      }}>
      <PopoverContent>
        <PopoverBody>{children}</PopoverBody>
        {closeBottom && (
          <PopoverFooter>
            <Button
              preset="light"
              color="primary"
              onPress={() => sheetRef.current && sheetRef.current.close()}
              text="cancelar"
            />
          </PopoverFooter>
        )}
      </PopoverContent>
    </RBSheet>
  );
};

export default Popover;
