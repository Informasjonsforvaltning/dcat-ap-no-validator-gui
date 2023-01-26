import React, {
  memo,
  FC,
  useState,
  ChangeEventHandler,
  useRef,
  MutableRefObject
} from 'react';
import { compose } from 'redux';
import { useDropzone } from 'react-dropzone';

import { Variant as ButtonVariant } from '@fellesdatakatalog/button';

import Select from 'react-select';

import IconSuccess from '../../images/icon-success.svg';

import RadioButton, { LabelPosition } from '../radio-button';
import Translation from '../translation';

import SC from './styled';

import { InputType } from '../../types/enums';
import { GraphField } from '../../types';

interface ExternalProps {
  graph: File | string | null;
  fields: GraphField[];
  isLoading: boolean;
  isStandalone?: boolean;
  onChange: (inputType: InputType, graph: File | string | null) => void;
}

interface Props extends ExternalProps {}

const GraphFieldset: FC<Props> = ({
  graph,
  fields,
  isLoading,
  isStandalone,
  onChange
}) => {
  const validate = () => {
    if (fields.filter(field => field.inputType === InputType.FILE).length > 1) {
      throw new Error(
        'Graph fieldset cannot contain more than one input of type FILE'
      );
    }
    if (fields.filter(field => field.inputType === InputType.URL).length > 1) {
      throw new Error(
        'Graph fieldset cannot contain more than one input of type URL'
      );
    }
    if (fields.filter(field => field.inputType === InputType.TEXT).length > 1) {
      throw new Error(
        'Graph fieldset cannot contain more than one input of type TEXT'
      );
    }
    if (
      fields.filter(field => field.inputType === InputType.SELECT).length > 1
    ) {
      throw new Error(
        'Graph fieldset cannot contain more than one input of type SELECT'
      );
    }
  };

  const isSelectOption = (value: string) =>
    fields.find(
      field =>
        field.inputType === InputType.SELECT &&
        field.options?.find(option => option.value === value)
    );

  const linkInputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const textInputRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  const [selectedInputType, setSelectedInputType] = useState(
    fields.find(field => field.checked)?.inputType
  );

  const [inputGraphFile, setInputGraphFile] = useState<File | null>(
    graph instanceof File ? graph : null
  );
  const [inputGraphUrl, setInputGraphUrl] = useState(
    typeof graph === 'string' && !isSelectOption(graph) ? graph : ''
  );
  const [inputGraphText, setInputGraphText] = useState('');
  const [inputGraphSelect, setInputGraphSelect] = useState(
    typeof graph === 'string' && isSelectOption(graph) ? graph : ''
  );
  const [inputGraphSelectIsOpen, setInputGraphSelectIsOpen] = useState(false);

  const handleInputUrlChange: ChangeEventHandler<HTMLInputElement> = ({
    target
  }) => {
    setInputGraphUrl(target.value.trim());
    onChange(InputType.URL, target.value.trim());
  };

  const handleInputTextChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target
  }) => {
    setInputGraphText(target.value);
    onChange(InputType.TEXT, new File([target.value], 'data.rdf'));
  };

  const handleInputSelectChange = (option: any) => {
    setInputGraphSelect(option.value);
    onChange(InputType.SELECT, option.value);
  };

  const handleOnClickInputType = (type: InputType) => {
    if (!isLoading) {
      setSelectedInputType(type);

      switch (type) {
        case InputType.FILE:
          setInputGraphSelectIsOpen(false);
          onChange(InputType.FILE, inputGraphFile);
          break;
        case InputType.URL:
          setInputGraphSelectIsOpen(false);
          onChange(InputType.URL, inputGraphUrl);
          setTimeout(() => linkInputRef.current.focus(), 50);
          break;
        case InputType.TEXT:
          setInputGraphSelectIsOpen(false);
          onChange(InputType.TEXT, new File([inputGraphText], 'data.rdf'));
          setTimeout(() => textInputRef.current.focus(), 50);
          break;
        case InputType.SELECT:
          setInputGraphSelectIsOpen(!inputGraphSelectIsOpen);
          onChange(InputType.SELECT, inputGraphSelect);
          break;
        default:
          setInputGraphSelectIsOpen(false);
      }
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: openFileSelector
  } = useDropzone({
    onDropAccepted: ([file]) => {
      if (!isLoading) {
        setSelectedInputType(InputType.FILE);
        setInputGraphFile(file);
        onChange(InputType.FILE, file);
      }
    },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true
  });

  const renderField = (field: GraphField) => {
    switch (field.inputType) {
      case InputType.FILE:
        return (
          <RadioButton
            key={field.name}
            checked={selectedInputType === InputType.FILE}
            labelPosition={LabelPosition.RIGHT}
            onClick={() => handleOnClickInputType(InputType.FILE)}
          >
            <SC.InputType id='validateFile'>
              <SC.InputTypeTitle>{field.title}</SC.InputTypeTitle>
              <SC.DropZone
                uploaded={!!inputGraphFile && !isDragActive}
                {...getRootProps({ isDragActive, disabled: isLoading })}
              >
                <input {...getInputProps()} aria-labelledby='validateFile' />
                {isDragActive && (
                  <p>
                    <Translation id='Slipp filen her' />
                  </p>
                )}
                {!inputGraphFile && !isDragActive && (
                  <SC.Row>
                    <Translation id='Slipp filen her eller' />
                    <SC.Button
                      variant={ButtonVariant.TERTIARY}
                      onClick={openFileSelector}
                    >
                      <Translation id='velg fra maskinen' />
                    </SC.Button>
                  </SC.Row>
                )}
                {inputGraphFile && !isDragActive && (
                  <>
                    <SC.Row>
                      <Translation id='Slipp filen her eller' />
                      <SC.Button
                        variant={ButtonVariant.TERTIARY}
                        onClick={openFileSelector}
                      >
                        <Translation id='velg fra maskinen' />
                      </SC.Button>
                    </SC.Row>
                    <SC.Row>
                      <IconSuccess />
                      <span>{inputGraphFile.name}</span>
                    </SC.Row>
                  </>
                )}
              </SC.DropZone>
            </SC.InputType>
          </RadioButton>
        );
      case InputType.SELECT:
        return (
          <RadioButton
            key={field.name}
            checked={selectedInputType === InputType.SELECT}
            labelPosition={LabelPosition.RIGHT}
            onClick={() => handleOnClickInputType(InputType.SELECT)}
          >
            <SC.InputTypeSmall>
              <SC.InputTypeTitle>{field.title}</SC.InputTypeTitle>
              <Select
                options={field.options}
                isClearable={false}
                menuIsOpen={inputGraphSelectIsOpen}
                onChange={handleInputSelectChange}
                value={
                  inputGraphSelect
                    ? field.options?.find(
                        option => option.value === inputGraphSelect
                      )
                    : field.options && field.options[0]
                }
              />
            </SC.InputTypeSmall>
          </RadioButton>
        );
      case InputType.URL:
        return (
          <RadioButton
            key={field.name}
            checked={selectedInputType === InputType.URL}
            labelPosition={LabelPosition.RIGHT}
            onClick={() => handleOnClickInputType(InputType.URL)}
          >
            <SC.InputType id='validateLink'>
              <SC.InputTypeTitle>{field.title}</SC.InputTypeTitle>
              <SC.LinkInput>
                <input
                  type='text'
                  aria-labelledby='validateLink'
                  ref={linkInputRef}
                  placeholder={field.placeholder}
                  value={inputGraphUrl}
                  onChange={handleInputUrlChange}
                  disabled={selectedInputType !== InputType.URL || isLoading}
                />
              </SC.LinkInput>
            </SC.InputType>
          </RadioButton>
        );

      case InputType.TEXT:
        return (
          <RadioButton
            key={field.name}
            checked={selectedInputType === InputType.TEXT}
            labelPosition={LabelPosition.RIGHT}
            onClick={() => handleOnClickInputType(InputType.TEXT)}
          >
            <SC.InputType id='validateText'>
              <SC.InputTypeTitle>{field.title}</SC.InputTypeTitle>
              <SC.TextInput>
                <textarea
                  ref={textInputRef}
                  aria-labelledby='validateText'
                  placeholder={field.placeholder}
                  value={inputGraphText}
                  onChange={handleInputTextChange}
                  disabled={selectedInputType !== InputType.TEXT || isLoading}
                />
              </SC.TextInput>
            </SC.InputType>
          </RadioButton>
        );
      default:
        return 'Uknown type';
    }
  };

  validate();

  return (
    <SC.GraphInputGroup $isStandalone={isStandalone}>
      {fields.map(renderField)}
    </SC.GraphInputGroup>
  );
};

export default compose<FC<ExternalProps>>(memo)(GraphFieldset);
