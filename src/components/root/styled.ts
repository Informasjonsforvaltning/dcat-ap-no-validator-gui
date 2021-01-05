import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const Root = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  padding: ${theme.spacing('S16')};
`;

export default { Root };
