import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const BetaTag = styled.span`
  position: absolute;
  top: 100px;
  right: -40px;
  padding: ${theme.spacing('S8')} ${theme.spacing('S56')};
  transform: rotate(45deg);
  font-size: ${theme.fontSize('FS20')};
  font-weight: ${theme.fontWeight('FW700')};
  background: ${theme.colour(Colour.YELLOW, 'Y30')};

  @media (max-width: 900px) {
    & {
      top: calc(75px + (100 - 75) * ((100vw - 320px) / (900 - 320)));
    }
  }
`;

export default { BetaTag };
