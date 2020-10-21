import {Platform, PixelRatio} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {DefaultTheme} from 'styled-components';

export const guupTheme: DefaultTheme = {
  images: {
    logo: {
      mini: require('./../../assets/images/guupImgLogo.png'),
      medium: require('./../../assets/images/guupImgLogoMedium.png'),
      large: require('./../../assets/images/guupImgLogoLarge.png'),
    },
    onboarding: {
      welcome: require('./../../assets/images/guupOnboardFirst.png'),
    },
    avatar: {
      blank: require('./../../assets/images/guupBlankAvatar.png'),
    },
  },
  device: {
    header: {
      ios: {
        notch: 44,
        simple: 20,
      },
      android: {
        notch: 20,
        simple: 20,
      },
    },
  },
  icons: {
    guup: require('./../../assets/icons/guupIconLogo.png'),
    explorer: require('./../../assets/icons/guupIconExplore.png'),
    news: require('./../../assets/icons/guupIconNews.png'),
    box: require('./../../assets/icons/guupIconBox.png'),
    profile: require('./../../assets/icons/guupIconProfile.png'),
    search: require('./../../assets/icons/guupIconSearch.png'),
    heart: require('./../../assets/icons/guupIconHeart.png'),
    arrow: require('./../../assets/icons/guupIconArrow.png'),
    dots: require('./../../assets/icons/guupIconDots.png'),
    chat: require('./../../assets/icons/guupIconChat.png'),
    project: require('./../../assets/icons/guupIconProject.png'),
    forum: require('./../../assets/icons/guupIconForums.png'),
    module: require('./../../assets/icons/guupIconModules.png'),
    clock: require('./../../assets/icons/guupIconClock.png'),
    chevron: require('./../../assets/icons/guupIconChevron.png'),
    chevronMenu: require('./../../assets/icons/guupIconChevronMenu.png'),
    video: require('./../../assets/icons/guupIconVideo.png'),
    article: require('./../../assets/icons/guupIconArticle.png'),
    claps: require('./../../assets/icons/guupIconClaps.png'),
    clapsActive: require('./../../assets/icons/guupIconClapsActive.png'),
    bell: require('./../../assets/icons/guupIconBell.png'),
    save: require('./../../assets/icons/guupIconSave.png'),
    gallery: require('./../../assets/icons/guupIconGallery.png'),
    lock: require('./../../assets/icons/guupIconLock.png'),
    unlock: require('./../../assets/icons/guupIconUnlonk.png'),
    plus: require('./../../assets/icons/guupIconPlus.png'),
  },
  iconsSizes: {
    small: '28px',
    normal: '36px',
    large: '44px',
  },
  colors: {
    ligth: '#FFFFFF',
    dark: '#17171E',
    ultraDark: '#0D0D11',
    primary: '#FF395C',
    secondary: '#3967FF',
    veryLigthGrey: '#F6F6F6',
    contrast: '#22FFA2',
    yellow: '#FFBC39',
    ligthGrey: '#DEDEDE',
    smoothGrey: '#E9E9E9',
    darkGrey: '#818493',
    greyBrown: '#444444',
  },
  gradients: {
    dark: require('./../../assets/images/guupBlackGradient.png'),
    primary: ['#FF395C', '#F8647E'],
    secondary: ['#394AFF', '#3967FF'],
  },
  fontFamily: Platform.OS === 'ios' ? ['SF Pro Display'] : ['SF-Pro-Display'],
  fontFamilyAndroid: {
    light: 'SF-Pro-Display-Light',
    regular: 'SF-Pro-Display-Regular',
    medium: 'SF-Pro-Display-Medium',
    semiBold: 'SF-Pro-Display-Semibold',
    bold: 'SF-Pro-Display-Bold',
    heavy: 'SF-Pro-Display-Heavy',
  },
  fontWeight: {
    ligth: 100,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    heavy: 800,
  },
  fontSize: {
    tiny: `${RFValue(12, 775)}px`,
    small: `${RFValue(14, 775)}px`,
    tall: `${RFValue(15, 775)}px`,
    regular: `${RFValue(16, 775)}px`,
    medium: `${RFValue(19, 775)}px`,
    large: `${RFValue(24, 775)}px`,
    bigger: `${RFValue(34, 775)}px`,
  },
  borderRadius: {
    '4': `${PixelRatio.getFontScale() * 4}px`,
    '8': `${PixelRatio.getFontScale() * 8}px`,
    '12': `${PixelRatio.getFontScale() * 12}px`,
  },
  sizes: {
    buttom: {
      '54': '54px',
      '68': '68px',
    },
    avatar: {
      '36': '36px',
      '48': '48px',
    },
  },
  spacing: {
    '1': `${PixelRatio.getFontScale() * 1}px`,
    '5': `${PixelRatio.getFontScale() * 5}px`,
    '10': `${PixelRatio.getFontScale() * 10}px`,
    '15': `${PixelRatio.getFontScale() * 15}px`,
    '20': `${PixelRatio.getFontScale() * 20}px`,
    '25': `${PixelRatio.getFontScale() * 25}px`,
    '30': `${PixelRatio.getFontScale() * 30}px`,
    '35': `${PixelRatio.getFontScale() * 35}px`,
    '40': `${PixelRatio.getFontScale() * 40}px`,
    '50': `${PixelRatio.getFontScale() * 50}px`,
    '80': `${PixelRatio.getFontScale() * 80}px`,
    '100': `${PixelRatio.getFontScale() * 100}px`,
    margin: {
      '15': `${PixelRatio.getFontScale() * 15}px`,
      '20': `${PixelRatio.getFontScale() * 20}px`,
      '25': `${PixelRatio.getFontScale() * 25}px`,
      '30': `${PixelRatio.getFontScale() * 30}px`,
      '40': `${PixelRatio.getFontScale() * 40}px`,
      '50': `${PixelRatio.getFontScale() * 50}px`,
    },
    padding: {
      '15': `${PixelRatio.getFontScale() * 15}px`,
      '20': `${PixelRatio.getFontScale() * 20}px`,
      '25': `${PixelRatio.getFontScale() * 25}px`,
      '30': `${PixelRatio.getFontScale() * 30}px`,
      '40': `${PixelRatio.getFontScale() * 40}px`,
      '50': `${PixelRatio.getFontScale() * 50}px`,
    },
    lineHeigth: {
      l21: `${RFValue(22, 775)}px`,
      l24: `${RFValue(26, 775)}px`,
      l38: `${RFValue(38, 775)}px`,
      l42: `${RFValue(42, 775)}px`,
    },
  },
};
