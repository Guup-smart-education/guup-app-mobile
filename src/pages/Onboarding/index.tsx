import React, {useRef} from 'react';
import {Animated} from 'react-native';
import nextId from 'react-id-generator';
import {DataOnboarding} from './../../data';
import {
  SliderImageContainer,
  SliderContent,
  OnboardingContainer,
  OnboardingSliderBlock,
} from './_styled';
import {Container, Text, Link, Separator, CustomImage} from './../../ui';
import {Carousel} from './../../components';
import {PropsAuth} from './../../@types/auth.navigation';
import {GetUniqueId} from './../../helper';

interface IOnboardItem {
  title: string;
  description: string;
  scrollX: Animated.Value;
  index: number;
}

const OnboardItem: React.FC<IOnboardItem> = ({
  title,
  description,
  // scrollX,
  // index,
}) => {
  // const width = Dimensions.get('screen').width;
  // const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  // const scale = scrollX.interpolate({
  //   inputRange,
  //   outputRange: [0, 1, 0],
  // });
  // const translateXTitle = scrollX.interpolate({
  //   inputRange,
  //   outputRange: [width * 0.1, 0, -width * 0.1],
  // });
  // const translateXDescription = scrollX.interpolate({
  //   inputRange,
  //   outputRange: [width * 0.7, 0, -width * 0.7],
  // });
  return (
    <OnboardingContainer key={nextId('page-')}>
      <OnboardingSliderBlock>
        <SliderImageContainer
        // as={Animated.View}
        // style={[
        //   {
        //     transform: [{scale}],
        //   },
        // ]}
        >
          <CustomImage module="onboarding" name="welcome" />
        </SliderImageContainer>
        <SliderContent>
          <Text
            // as={Animated.Text}
            // style={[
            //   {
            //     transform: [{translateX: translateXTitle}],
            //   },
            // ]}
            preset="title">
            {title}
          </Text>
          <Separator size="small" />
          <Text
            // as={Animated.Text}
            // style={[
            //   {
            //     transform: [{translateX: translateXDescription}],
            //   },
            // ]}
            preset="paragraph"
            color="greyBrown">
            {description}
          </Text>
        </SliderContent>
      </OnboardingSliderBlock>
    </OnboardingContainer>
  );
};

const OnboardScreen: React.FC<PropsAuth> = ({navigation}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <Container safe light>
      <Carousel
        scrollX={scrollX}
        size={DataOnboarding.slider.length}
        dotsPosition="left"
        footerAction={() => (
          <Link
            preset="solid"
            onPress={() => navigation.navigate('AuthSignIn')}>
            Bora começar
          </Link>
        )}>
        {DataOnboarding.slider.map(({title, description}, index) => (
          <OnboardItem
            key={GetUniqueId()}
            {...{title, description, scrollX, index}}
          />
        ))}
      </Carousel>
    </Container>
  );
};

export default OnboardScreen;
