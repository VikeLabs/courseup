import theme, { Theme } from '@chakra-ui/theme';
import { Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
  ...theme.styles,
  global: {
    ':focus:not(:focus-visible)': {
      boxShadow: 'none !important',
    },
  },
};

export const customTheme: Theme = {
  ...theme,
  styles,
};
