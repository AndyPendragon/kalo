/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4'
const tintColorDark = '#fff'

export const Colors = {
  light: {
    text: '#252525',
    background: '#fff8ed',
    tint: tintColorLight,
    icon: '#1976d2',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff8ed',
    background: '#252525',
    tint: tintColorDark,
    icon: '#1976d2',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
}
