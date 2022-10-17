import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

const primary_color = '#FF9431';
// "#3B8FAA"
export const DefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    // background: '#F9F9F9',
    // surface: '#ffffff',
    primary: primary_color,
    text: '#000000',
    border: '#206C84',
    error: '#F32013',
    surface: '#D8D8D8',
    onSurface: '#252525', // text on surface
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
    surfaceVariant: '#ffffff',
    onSurfaceVariant: '#252525',
    outline: '#E7E7E7',
    surfaceDisabled: '#ECECEC',
  },
};

export const DarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    background: '#14191F',
    primary: primary_color,
    surface: '#0B0F13',
    text: '#ffffff',
    error: '#CA0B00',
    onSurface: '#BCC3CD',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
    surfaceVariant: '#1C2026',
    onSurfaceVariant: '#BCC3CD',
    surfaceDisabled: '#606368',
    onSurfaceDisabled: '',
    outline: '#32373e',
  },
};

// Fonts
export const ROBOTO_BOLD = 'Roboto-Bold';
export const ROBOTO_MEDIUM = 'Roboto-Medium';
export const ROBOTO_REGULAR = 'Roboto-Regular';
