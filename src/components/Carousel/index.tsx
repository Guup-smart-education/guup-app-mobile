import React, {useState, ReactNode, ReactType, useRef, useEffect} from 'react';
import {ScrollView} from 'react-native';
import nextId from 'react-id-generator';
import {
  CarouselContainer,
  CarouselFooter,
  CarouselDotsContainer,
  CarouselDot,
} from './_styled';

export enum EDotsPosition {
  'left' = 'left',
  'center' = 'center',
  'right' = 'right',
}

interface IProps {
  size: number;
  showDots?: boolean;
  enabled?: boolean;
  children: ReactNode;
  paging?: boolean;
  page?: number;
  dotsPosition?: keyof typeof EDotsPosition;
  horizontalPadding?: boolean;
  footerAction?: ReactNode;
}

const Carousel: React.FC<IProps> = ({
  size,
  showDots = true,
  enabled = true,
  children,
  paging = false,
  page = 0,
  dotsPosition = 'center',
  horizontalPadding = false,
  footerAction,
}) => {
  const carouselRef = useRef<ScrollView>(null);
  const dots = [...Array.from(Array(size).keys())];
  const [interval, setInterval] = useState(0);
  const [width, setWidth] = useState(1);

  const transformComponent = (component: ReactNode, params = {}) => {
    const Component: ReactType | any = component;
    return <Component {...params} />;
  };

  const init = (widthCarousel: number) => {
    setWidth(widthCarousel / size);
  };

  const onScrollEnd = (e: {nativeEvent: any}) => {
    if (!e) {
      return;
    }
    const {nativeEvent} = e;
    if (nativeEvent && nativeEvent.contentOffset) {
      const i = nativeEvent.contentOffset.x / width;
      setInterval(i);
    }
  };

  useEffect(() => {
    if (paging) {
      carouselRef.current?.scrollTo({x: width * page, y: 0, animated: true});
    }
  });

  return (
    <>
      <CarouselContainer
        ref={carouselRef}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{width: `${100 * size}%`}}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
        onContentSizeChange={init}
        onMomentumScrollEnd={onScrollEnd}
        scrollEnabled={enabled}
        snapToAlignment="start"
        // snapToInterval={2}
        // snapToOffsets={[1, 2, 3]}
        pagingEnabled
        {...{horizontalPadding}}>
        {children}
      </CarouselContainer>
      {showDots && (
        <CarouselFooter {...{dotsPosition}}>
          <CarouselDotsContainer>
            {dots.map((dot) => (
              <CarouselDot key={nextId('fot-')} active={dot === interval} />
            ))}
          </CarouselDotsContainer>
          {footerAction && transformComponent(footerAction)}
        </CarouselFooter>
      )}
    </>
  );
};

export default Carousel;
