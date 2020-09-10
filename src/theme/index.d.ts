import 'styled-components/native';

declare module 'styled-components' {
  export interface DefaultTheme {
    images: {
      logo: {
        mini: Blob;
        medium: Blob;
        large: Blob;
      };
      onboarding: {
        welcome: Blob;
      };
    };
    device: {
      header: {
        ios: {
          notch: number;
          simple: number;
        };
        android: {
          notch: number;
          simple: number;
        };
      };
    };
    icons: {
      guup: Blob;
      explorer: Blob;
      news: Blob;
      box: Blob;
      profile: Blob;
      search: Blob;
      heart: Blob;
      arrow: Blob;
      dots: Blob;
      chat: Blob;
      forum: Blob;
      module: Blob;
      clock: Blob;
      project: Blob;
      chevron: Blob;
      video: Blob;
      article: Blob;
    };
    colors: {
      ligth: string;
      dark: string;
      ultraDark: string;
      primary: string;
      secondary: string;
      contrast: string;
      yellow: string;
      veryLigthGrey: string;
      ligthGrey: string;
      smoothGrey: string;
      darkGrey: string;
      greyBrown: string;
    };
    gradients: {
      dark: Blob;
      primary: Array<string>;
      secondary: Array<string>;
    };
    fontFamily: Array<string>;
    fontFamilyAndroid: {
      light: string;
      regular: string;
      medium: string;
      semiBold: string;
      bold: string;
      heavy: string;
    };
    fontWeight: {
      ligth: number;
      regular: number;
      medium: number;
      semiBold: number;
      bold: number;
      heavy: number;
    };
    fontSize: {
      tiny: string;
      small: string;
      tall: string;
      regular: string;
      medium: string;
      large: string;
      bigger: string;
    };
    borderRadius: {
      4: string;
      8: string;
      12: string;
    };
    sizes: {
      buttom: {
        54: string;
        68: string;
      };
      avatar: {
        36: string;
        48: string;
      };
    };
    spacing: {
      5: string;
      10: string;
      15: string;
      20: string;
      25: string;
      30: string;
      40: string;
      50: string;
      80: string;
      100: string;
      padding: {
        15: string;
        20: string;
        25: string;
        30: string;
        40: string;
        50: string;
      };
      margin: {
        15: string;
        20: string;
        25: string;
        30: string;
        40: string;
        50: string;
      };
      lineHeigth: {
        l24: string;
        l38: string;
        l42: string;
      };
    };
  }
}
