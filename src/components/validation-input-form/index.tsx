import React, { memo, FC, useState, ChangeEventHandler } from 'react';
import { compose } from 'redux';
import { useDropzone } from 'react-dropzone';
import Translation from '../translation';
import SC from './styled';

interface ExternalProps {
  url?: string;
  isLoading: boolean;
  onValidate: (file: File | string) => void;
}
interface Props extends ExternalProps {}
const ValidationInputForm: FC<Props> = ({
  url: externalUrl,
  isLoading,
  onValidate
}) => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [inputUrl, setInputUrl] = useState(externalUrl ?? '');

  const validateInput = () => {
    if (inputFile || inputUrl) {
      onValidate(inputFile || inputUrl);
    }
  };

  const removeInputFile = () => setInputFile(null);

  const handleInputFieldChange: ChangeEventHandler<HTMLInputElement> = ({
    target
  }) => setInputUrl(target.value);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: openFileSelector
  } = useDropzone({
    onDropAccepted: ([file]) => {
      if (!isLoading) {
        setInputFile(file);
        setInputUrl('');
      }
    },
    maxFiles: 1,
    accept: ['text/plain', 'application/json', '.ttl', '.json'],
    noClick: true,
    noKeyboard: true
  });
  return (
    <SC.ValidationInputForm>
      <SC.DropZone {...getRootProps({ isDragActive, disabled: isLoading })}>
        <input {...getInputProps()} />
        {isDragActive && (
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
        {inputFile && !isDragActive && (
          <SC.Row>
            <SC.UploadedFileIcon />
            <p>
              <Translation id='Fil lastet opp' />
            </p>
            <SC.Button onClick={openFileSelector}>
              <Translation id='Velg en annen fil' />
            </SC.Button>
            <SC.Button onClick={removeInputFile}>
              <Translation id='Slett fil' />
            </SC.Button>
          </SC.Row>
        )}
      </SC.DropZone>
      <SC.LinkInput>
        <input
          type='text'
          placeholder='Last inn fil via lenke'
          value={inputFile?.name ?? inputUrl}
          onChange={handleInputFieldChange}
          disabled={!!inputFile || isLoading}
        />
        <SC.Button
          onClick={validateInput}
          disabled={isLoading || !(inputFile || inputUrl)}
        >
          {isLoading ? <SC.Spinner /> : <Translation id='Valider' />}
        </SC.Button>
      </SC.LinkInput>
    </SC.ValidationInputForm>
  );
};
export default compose<FC<ExternalProps>>(memo)(ValidationInputForm);
