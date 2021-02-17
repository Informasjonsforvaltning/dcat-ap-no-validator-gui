import styled, { css } from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import CircularProgress from '@material-ui/core/CircularProgress';
import LibraryAddCheck from '@material-ui/icons/LibraryAddCheck';

import ExpansionPanelBase from '../expansion-panel';
import ButtonBase from '../button';

const ValidationInputForm = styled.form`
  user-select: none;
  & > *:nth-child(n + 2) {
    margin-top: ${theme.spacing('S24')};
  }
`;

const Button = styled(ButtonBase)`
  min-width: 100px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const InputType = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const InputTypeTitle = styled.div`
  font-weight: ${theme.fontWeight('FW900')};
  margin-bottom: ${theme.spacing('S4')};
`;

const DropZone = styled.div<{ isDragActive?: boolean; disabled?: boolean }>`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  border: 2px dashed ${theme.colour(Colour.NEUTRAL, 'N50')};
  border-radius: 5px;
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};
  outline: none;

  & > *:nth-child(n + 2) {
    margin-top: ${theme.spacing('S8')};
  }

  & > p {
    font-size: ${theme.fontSize('FS20')};
    font-weight: ${theme.fontWeight('FW700')};
  }

  ${({ isDragActive }) =>
    isDragActive &&
    css`
      border-color: ${theme.colour(Colour.NEUTRAL, 'N60')};
    `}

  & > ${Row} {
    & > p {
      margin-left: ${theme.spacing('S12')};
      font-size: ${theme.fontSize('FS20')};
      font-weight: ${theme.fontWeight('FW700')};
    }

    & > button {
      margin-left: ${theme.spacing('S24')};
    }
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.7;
      user-select: none;
      pointer-events: none;
    `}
`;

const UploadedFileIcon = styled(LibraryAddCheck)`
  height: 40px;
  width: 40px;
  min-height: 40px;
  min-width: 40px;

  & > path {
    fill: ${theme.colour(Colour.GREEN, 'G50')};
  }
`;

const LinkInput = styled.div`
  display: flex;
  flex-grow: 1;

  & > input {
    flex: 1;
    padding: ${theme.spacing('S8')} ${theme.spacing('S12')};
    border: 1px solid ${theme.colour(Colour.NEUTRAL, 'N50')};
    border-radius: 4px;
    outline: none;
    background: ${theme.colour(Colour.NEUTRAL, 'N0')};

    &:disabled {
      opacity: 0.7;
      user-select: none;
      pointer-events: none;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 1px ${theme.colour(Colour.NEUTRAL, 'N70')};
    }
  }
`;

const TextInput = styled.div`
  display: flex;
  flex-grow: 1;

  & > textarea {
    flex: 1;
    padding: ${theme.spacing('S8')} ${theme.spacing('S12')};
    border: 1px solid ${theme.colour(Colour.NEUTRAL, 'N50')};
    border-radius: 4px;
    outline: none;
    background: ${theme.colour(Colour.NEUTRAL, 'N0')};
    height: 100px;

    &:disabled {
      opacity: 0.7;
      user-select: none;
      pointer-events: none;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 1px ${theme.colour(Colour.NEUTRAL, 'N70')};
    }
  }
`;

const Spinner = styled(CircularProgress)`
  height: 16px !important;
  width: 16px !important;
  min-height: 16px !important;
  min-width: 16px !important;
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
  DropZone,
  Row,
  InputType,
  InputTypeTitle,
  UploadedFileIcon,
  LinkInput,
  TextInput,
  Spinner,
  ExpansionPanel,
  CheckboxLabel
};
