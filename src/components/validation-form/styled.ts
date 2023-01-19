import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import CircularProgress from '@material-ui/core/CircularProgress';

import ExpansionPanelBase from '../expansion-panel';
import ButtonBase from '../button';

const ValidationInputForm = styled.form`
  user-select: none;

  & > *:nth-child(n + 2) {
    margin-top: ${theme.spacing('S24')};
  }
`;

const Button = styled(ButtonBase)`
  min-width: 100;
  &:focus {
    outline-style: solid;
    outline-color: orange;
    outline-width: 3px;
  }
`;

const Spinner = styled(CircularProgress)`
  height: 18px !important;
  width: 18px !important;
  min-height: 18px !important;
  min-width: 18px !important;
  margin: 0 auto;

  & > svg > circle {
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
`;

const ExpansionPanel = styled(ExpansionPanelBase)`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

  & > :nth-child(1) {
    background: ${theme.colour(Colour.NEUTRAL, 'N0')};
    padding: ${theme.spacing('S24')};
    font-size: ${theme.fontSize('FS24')};
    font-weight: ${theme.fontWeight('FW700')};
    border-radius: 4px;

    & > div > svg > path {
      fill: ${theme.colour(Colour.NEUTRAL, 'N60')};
    }
  }

  & > :nth-child(2) {
    background: ${theme.colour(Colour.NEUTRAL, 'N0')};
    padding: ${theme.spacing('S24')};
    border-radius: 4px;
  }
`;

const CheckboxLabel = styled.div`
  display: flex;
  flex-direction: column;

  & > span:nth-of-type(1) {
    font-weight: ${theme.fontWeight('FW700')};
  }
  & > span:nth-of-type(2) {
    padding-bottom: ${theme.spacing('S8')};
  }
`;

export default {
  ValidationInputForm,
  Button,
  Spinner,
  ExpansionPanel,
  CheckboxLabel
};
