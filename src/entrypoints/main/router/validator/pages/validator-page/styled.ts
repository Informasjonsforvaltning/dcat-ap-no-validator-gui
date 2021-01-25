import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';
import AlertBase from '@fellesdatakatalog/alert';

import ValidationInputFormBase from '../../../../../../components/validation-input-form';
import ValidationReportBase from '../../../../../../components/validation-report';

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

  @media (max-width: 1020px) {
    & {
      font-size: calc(24px + (48 - 24) * ((100vw - 320px) / (1020 - 320)));
    }
  }
`;

const ValidationInputForm = styled(ValidationInputFormBase)`
  margin-top: ${theme.spacing('S56')};
`;

const Alert = styled(AlertBase)`
  margin-top: ${theme.spacing('S16')};
`;

const ValidationReport = styled(ValidationReportBase)`
  margin-top: ${theme.spacing('S32')};
`;

export default {
  ValidatorPage,
  Title,
  ValidationInputForm,
  Alert,
  ValidationReport
};
