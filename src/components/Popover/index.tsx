import React, {ReactNode} from 'react';
import {Animated, Dimensions, PanResponder, StyleSheet} from 'react-native';
import {
  PopoverContainer,
  PopoverOverlay,
  PopoverContent,
  PopoverModal,
  PopoverBody,
  PopoverHeader,
  PopoverFooter,
  PopoverBarClose,
} from './_styled';
import {Text, Button} from './../../ui';

interface IPopover {
  readonly visible: boolean;
  readonly toggle: () => void;
  readonly title?: string;
  readonly closeBottom?: boolean;
  readonly children?: ReactNode;
}

const Popover = ({
  visible,
  toggle,
  children,
  title,
  closeBottom = true,
}: IPopover) => {
  // const dragY = useRef(new Animated.Value(0)).current;
  // const dragY = useRef(new Animated.Value(Dimensions.get('screen').height))
  //   .current;

  // const resetPosition = Animated.timing(dragY, {
  //   toValue: 0,
  //   duration: 300,
  //   useNativeDriver: true,
  // });

  // const closeAnimation = Animated.timing(dragY, {
  //   toValue: Dimensions.get('screen').height,
  //   duration: 500,
  //   useNativeDriver: true,
  // });

  // const top = dragY.interpolate({
  //   inputRange: [-1, 0, 1],
  //   outputRange: [0, 0, 1],
  // });

  // const onDismiss = () => {
  //   closeAnimation.start(() => toggle());
  // };

  // const panResponder = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onMoveShouldSetPanResponder: () => false,
  //     onPanResponderMove: () => {
  //       console.log('onPanResponderMove');
  //       Animated.event([null, {dy: dragY}], {
  //         useNativeDriver: true,
  //       });
  //       return true;
  //     },
  //     onPanResponderRelease: (e, gs) => {
  //       if (gs.dy > 0 && gs.vy > 2) {
  //         return closeAnimation.start(() => toggle());
  //       }
  //       return resetPosition.start();
  //     },
  //   }),
  // ).current;

  return (
    <PopoverModal animationType="fade" transparent visible={visible}>
      <PopoverContainer>
        <PopoverOverlay />
        {/* <PopoverContent
          as={Animated.View}
          style={[{top}]}
          {...panResponder.panHandlers}>
            <Text>Popover content</Text>
          </PopoverContent>
        */}
        <PopoverContent>
          <PopoverHeader>
            <PopoverBarClose />
          </PopoverHeader>
          <PopoverBody>{children}</PopoverBody>
          {closeBottom && (
            <PopoverFooter>
              <Button
                preset="solid"
                color="primary"
                onPress={() => toggle()}
                text="Fechar"
              />
            </PopoverFooter>
          )}
        </PopoverContent>
      </PopoverContainer>
    </PopoverModal>
  );
};

export default Popover;
