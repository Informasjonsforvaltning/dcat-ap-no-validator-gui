import type { Theme } from '@fellesdatakatalog/theme';

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
