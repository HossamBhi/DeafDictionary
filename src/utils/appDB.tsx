import {t} from 'i18next';

export interface ThemeProps {
  value: number | string;
  label: string;
}

export const _getAppThemes = () => [
  {value: 1, label: t('defaultTheme')},
  {value: 2, label: t('darkTheme')},
  {value: 3, label: t('lightTheme')},
];

export const _getAppLanguages = () => [
  {value: 1, label: t('arabic')},
  {value: 2, label: t('english')},
];
