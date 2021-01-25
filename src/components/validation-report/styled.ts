import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import SuccessSVG from '@material-ui/icons/DoneAll';
import ErrorSVG from '@material-ui/icons/Error';
import WarningSVG from '@material-ui/icons/Warning';
import InfoSVG from '@material-ui/icons/Info';

const ValidationReport = styled.div``;

const ValidationSummary = styled.div`
  display: flex;
  padding: ${theme.spacing('S24')};
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};
`;

const SuccessIcon = styled(SuccessSVG)`
  & > path {
    color: ${theme.colour(Colour.GREEN, 'G50')};
  }
`;

const ErrorIcon = styled(ErrorSVG)`
  & > path {
    color: ${theme.colour(Colour.RED, 'R50')};
  }
`;

const WarningIcon = styled(WarningSVG)`
  & > path {
    color: ${theme.colour(Colour.YELLOW, 'Y70')};
  }
`;

const InfoIcon = styled(InfoSVG)`
  & > path {
    color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  }
`;

const SummaryBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing('S16')};
  border-radius: 4px;
  font-size: ${theme.fontSize('FS20')};
  font-weight: ${theme.fontWeight('FW700')};

  &:nth-of-type(n + 2) {
    margin-left: ${theme.spacing('S16')};
  }

  & > ${SuccessIcon}, & > ${ErrorIcon}, & > ${WarningIcon}, & > ${InfoIcon} {
    height: 24px;
    width: 24px;
    min-height: 24px;
    min-width: 24px;
    margin-right: ${theme.spacing('S6')};
  }
`;

const ConformsSummary = styled(SummaryBox)`
  color: ${theme.colour(Colour.GREEN, 'G50')};
  background: ${theme.colour(Colour.GREEN, 'G20')};
`;

const ErrorsSummary = styled(SummaryBox)`
  color: ${theme.colour(Colour.RED, 'R50')};
  background: ${theme.colour(Colour.RED, 'R20')};
`;

const WarningsSummary = styled(SummaryBox)`
  color: ${theme.colour(Colour.YELLOW, 'Y70')};
  background: ${theme.colour(Colour.YELLOW, 'Y20')};
`;

const TipsSummary = styled(SummaryBox)`
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  background: ${theme.colour(Colour.NEUTRAL, 'N20')};
`;

const ValidationResults = styled.section`
  margin-top: ${theme.spacing('S32')};
  padding: ${theme.spacing('S24')};
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};

  & > h3 {
    display: flex;
    align-items: center;
    font-size: ${theme.fontSize('FS28')};

    & > ${ErrorIcon}, & > ${WarningIcon}, & > ${InfoIcon} {
      height: 32px;
      width: 32px;
      min-height: 32px;
      min-width: 32px;
      margin-right: ${theme.spacing('S12')};
    }
  }
`;

const ValidationResult = styled.div`
  margin-top: ${theme.spacing('S32')};

  & > h4 {
    margin-bottom: ${theme.spacing('S12')};
    padding: ${theme.spacing('S8')} ${theme.spacing('S16')};
    border-radius: 4px;
    font-size: ${theme.fontSize('FS20')};
    font-weight: ${theme.fontWeight('FW500')};

    & + p {
      font-weight: ${theme.fontWeight('FW700')};
    }
  }

  & > h6 {
    margin-top: ${theme.spacing('S16')};
    margin-left: ${theme.spacing('S16')};
    font-weight: ${theme.fontWeight('FW400')};
  }

  & > p {
    margin-top: ${theme.spacing('S6')};
    margin-left: ${theme.spacing('S16')};
  }
`;

const ValidationErrors = styled(ValidationResults)``;

const ValidationError = styled(ValidationResult)`
  & > h4 {
    color: ${theme.colour(Colour.RED, 'R50')};
    background: ${theme.colour(Colour.RED, 'R20')};
  }
`;

const ValidationWarnings = styled(ValidationResults)``;

const ValidationWarning = styled(ValidationResult)`
  & > h4 {
    color: ${theme.colour(Colour.YELLOW, 'Y70')};
    background: ${theme.colour(Colour.YELLOW, 'Y20')};
  }
`;

const ValidationTips = styled(ValidationResults)``;

const ValidationTip = styled(ValidationResult)`
  & > h4 {
    color: ${theme.colour(Colour.NEUTRAL, 'N60')};
    background: ${theme.colour(Colour.NEUTRAL, 'N20')};
  }
`;

export default {
  ValidationReport,
  ValidationSummary,
  SuccessIcon,
  ErrorIcon,
  InfoIcon,
  WarningIcon,
  ConformsSummary,
  ErrorsSummary,
  WarningsSummary,
  TipsSummary,
  ValidationErrors,
  ValidationError,
  ValidationWarnings,
  ValidationWarning,
  ValidationTips,
  ValidationTip
};
