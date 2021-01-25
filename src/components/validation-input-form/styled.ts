import styled, { css } from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import CircularProgress from '@material-ui/core/CircularProgress';
import LibraryAddCheck from '@material-ui/icons/LibraryAddCheck';

import ButtonBase from '../button';

const ValidationInputForm = styled.form`
  user-select: none;
`;

const Button = styled(ButtonBase)``;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const DropZone = styled.div<{ isDragActive?: boolean; disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
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
    color: ${theme.colour(Colour.GREEN, 'G50')};
  }
`;

const LinkInput = styled.div`
  display: flex;
  margin-top: ${theme.spacing('S16')};

  & > input {
    flex: 1;
    padding: ${theme.spacing('S8')} ${theme.spacing('S12')};
    border: 1px solid ${theme.colour(Colour.NEUTRAL, 'N50')};
    border-right: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    outline: none;
    background: ${theme.colour(Colour.NEUTRAL, 'N0')};

    &:disabled {
      opacity: 0.7;
      user-select: none;
      pointer-events: none;
    }
  }

  & > ${Button} {
    min-width: 100px;
    justify-content: center;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const Spinner = styled(CircularProgress)`
  height: 16px !important;
  width: 16px !important;
  min-height: 16px !important;
  min-width: 16px !important;

  & > svg > circle {
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
`;

export default {
  ValidationInputForm,
  Button,
  DropZone,
  Row,
  UploadedFileIcon,
  LinkInput,
  Spinner
};
