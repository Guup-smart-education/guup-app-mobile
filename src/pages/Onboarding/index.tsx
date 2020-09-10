import React from 'react';
import nextId from 'react-id-generator';
import {DataOnboarding} from './../../data';
import {
  SliderImageContainer,
  SliderContent,
  OnboardingContainer,
  OnboardingFooter,
  OnboardingSliderBlock,
} from './_styled';
import {Container, Text, Link, Separator, CustomImage} from './../../ui';
import {Carousel} from './../../components';
import {PropsAuth} from './../../@types/auth.navigation';

const OnboardScreen: React.FC<PropsAuth> = ({navigation}) => {
  return (
    <Container safe>
      <Carousel
        size={DataOnboarding.slider.length}
        dotsPosition="left"
        footerAction={() => (
          <Link
            preset="solid"
            onPress={() => navigation.navigate('AuthSignIn')}>
            Bora começar
          </Link>
        )}>
        {DataOnboarding.slider.map((page) => (
          <OnboardingContainer key={nextId('page-')}>
            <OnboardingSliderBlock>
              <SliderImageContainer>
                <CustomImage module="onboarding" name="welcome" />
              </SliderImageContainer>
              <SliderContent>
                <Text preset="title">{page.title}</Text>
                <Separator size="small" />
                <Text preset="paragraph" color="greyBrown">
                  {page.description}
                </Text>
              </SliderContent>
            </OnboardingSliderBlock>
          </OnboardingContainer>
        ))}
      </Carousel>
      {/* <OnboardingFooter>
        <Link color="ligth" onPress={() => navigation.navigate('AuthSignUp')}>Criar uma conta</Link>
      </OnboardingFooter> */}
    </Container>
  );
};

export default OnboardScreen;
