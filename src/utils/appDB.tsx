import {t} from 'i18next';

export interface ThemeProps {
  value: string;
  label: string;
  direction?: string;
}

export const _getAppThemes = () => [
  {value: 1, label: t('defaultTheme')},
  {value: 2, label: t('darkTheme')},
  {value: 3, label: t('lightTheme')},
];

export const _getAppLanguages = () => [
  {value: 'ar', label: t('arabic'), direction: 'rtl'},
  {value: 'en', label: t('english'), direction: 'ltr'},
];
