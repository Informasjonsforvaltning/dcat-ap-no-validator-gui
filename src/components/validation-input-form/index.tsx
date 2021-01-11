import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import { useDropzone } from 'react-dropzone';

import Translation from '../translation';

import SC from './styled';

interface ExternalProps {
  isLoading: boolean;
  onValidate: () => void;
}

interface Props extends ExternalProps {}

const ValidationInputForm: FC<Props> = ({ isLoading, onValidate }) => {
  const [inputFile, setInputFile] = useState<File | null>(null);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: openFileSelector
  } = useDropzone({
    onDropAccepted: ([file]) => {
      if (file && !inputFile) {
        setInputFile(file);
      }
    },
    maxFiles: 1,
    accept: ['text/plain', 'application/json', '.ttl', '.json'],
    noClick: true,
    noKeyboard: true
  });

  return (
    <SC.ValidationInputForm>
      <SC.DropZone {...getRootProps({ isDragActive })}>
        <input {...getInputProps()} />
        {!inputFile && isDragActive && (
          <p>
            <Translation id='Slipp filen her' />
          </p>
        )}
        {!inputFile && !isDragActive && (
          <>
            <p>
              <Translation id='Slipp DCAT-fil i Turtle eller JSON-LD format her' />
            </p>
            <p>
              <Translation id='eller' />
            </p>
            <SC.Button onClick={openFileSelector}>
              <Translation id='Bla gjennom filer på maskina' />
            </SC.Button>
          </>
        )}
        {inputFile && (
          <SC.Row>
            <SC.UploadedFileIcon />
            <p>
              <Translation id='Fil lastet opp' />
            </p>
            <SC.Button onClick={openFileSelector}>
              <Translation id='Velg en annen fil' />
            </SC.Button>
          </SC.Row>
        )}
      </SC.DropZone>
      <SC.LinkInput>
        <input
          type='text'
          placeholder='Last inn fil via lenke'
          value={inputFile?.name}
          disabled={!!inputFile}
        />
        <SC.Button onClick={onValidate} disabled={!inputFile}>
          {inputFile && isLoading ? (
            <SC.Spinner />
          ) : (
            <Translation id='Valider' />
          )}
        </SC.Button>
      </SC.LinkInput>
    </SC.ValidationInputForm>
  );
};

export default compose<FC<ExternalProps>>(memo)(ValidationInputForm);
