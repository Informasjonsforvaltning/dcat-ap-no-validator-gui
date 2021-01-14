import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const ValidatorPage = styled.article`
  flex: 1;
  margin-top: ${theme.spacing('S48')};

  @media (max-width: 1020px) {
    & {
      margin-top: calc(24px + (48 - 24) * ((100vw - 320px) / (1020 - 320)));
    }
  }
`;

const Title = styled.h1`
  font-size: ${theme.fontSize('FS48')};
  font-weight: ${theme.fontWeight('FW700')};
  margin-bottom: ${theme.spacing('S56')};

  @media (max-width: 1020px) {
    & {
      font-size: calc(24px + (48 - 24) * ((100vw - 320px) / (1020 - 320)));
    }
  }
`;

const ValidationResult = styled.div`
  margin-top: ${theme.spacing('S24')};
`;

export default {
  ValidatorPage,
  ValidationResult,
  Title
};
