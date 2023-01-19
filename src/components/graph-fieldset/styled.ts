import styled, { css } from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import ButtonBase from '@fellesdatakatalog/button';
import LibraryAddCheck from '@material-ui/icons/LibraryAddCheck';

const GraphInputGroup = styled.div<{ $isStandalone?: boolean }>`
  ${({ $isStandalone }) =>
    $isStandalone &&
    css`
      padding: ${theme.spacing('S24')};
      border-radius: 4px;
      background: ${theme.colour(Colour.NEUTRAL, 'N0')};
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    `}

  & > *:nth-child(n + 2) {
    margin-top: ${theme.spacing('S24')};
  }
`;

const Button = styled(ButtonBase)`
  &:focus {
    outline-color: orange;
    outline-width: 3px;
  }
`;

const Uploaded = styled.div`
  background: ${theme.colour(Colour.GREEN, 'G10')};
`;

const Row = styled.div`
  display: flex;
`;

const RowAligned = styled.div`
  display: flex;
  align-items: center;
`;

const InputType = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const InputTypeSmall = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

const InputTypeTitle = styled.div`
  font-weight: ${theme.fontWeight('FW900')};
  margin-bottom: ${theme.spacing('S4')};
`;

interface DropZoneProps {
  isDragActive?: boolean;
  disabled?: boolean;
  uploaded?: boolean;
}

const DropZone = styled.div<DropZoneProps>`
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
    & > svg {
      position: relative;
      top: -2px;
    }

    & > * {
      margin-left: ${theme.spacing('S6')};
    }
  }

  & > ${RowAligned} {
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

  ${({ uploaded }) =>
    uploaded &&
    css`
      border: 1px solid #007d69;
      background: #d9ebe8;

      & > ${Row}:nth-last-of-type(1) > span {
        color: #007d69;
      }
    `}
`;

const UploadedFileIcon = styled(LibraryAddCheck)`
  height: 40px;
  width: 40px;
  min-height: 40px;
  min-width: 40px;

  & > path {
    fill: red;
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
    min-height: 100px;
    resize: vertical;

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

export default {
  GraphInputGroup,
  DropZone,
  InputType,
  InputTypeSmall,
  InputTypeTitle,
  UploadedFileIcon,
  LinkInput,
  TextInput,
  Row,
  RowAligned,
  Uploaded,
  Button
};
