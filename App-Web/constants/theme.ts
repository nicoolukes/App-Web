/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Background } from '@react-navigation/elements';
import { Platform } from 'react-native';

const tintColorLight = '#2E7D32';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    primary: '#9C784A',
    secondary: '#6B8A6F',
    acentuar: '#B26B34',
    background: '#F4F1EC',
    superficie: '#EAE6E0',
    text: '#2E2B25',
    textSecond:'#6B665D',
    bordes: '#C8BFB4',
    tabIconDefault: '#B26B34',
    tabIconSelected: '#B26B34',
    icon: '#2E2B25',
  },
  dark: {
    primary: '#C9A66B',
    secondary: '#7FAE88',
    acentuar: '#D18A54',
    background: '#1C1C1A',
    superficie: '#2A2A27',
    text: '#EAE6E0',
    textSecond:'#B3ADA3',
    bordes: '#3B3B38',
    tabIconDefault: '#D18A54',
    tabIconSelected: '#D18A54',
    icon: '#EAE6E0',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
