import React, { memo, FC } from 'react';
import { compose } from 'redux';
import ValidationInputForm from '../../../../../../components/validation-input-form';

import { RdfVersion } from '../../../../../../types/enums';
import withValidator, {
  Props as ValidatorProps
} from '../../../../../../components/with-validator';

import SC from './styled';

interface Props extends ValidatorProps {}

const ValidatorPage: FC<Props> = ({
  validationReport,
  isValidating,
  errorOccured,
  validatorActions: { validateRdfRequested: validateRdf }
}) => {
  const isLoading = false;
  const onValidate = (inputFile: File | null) => {
    if (inputFile) {
      validateRdf({
        resource: {
          file: inputFile
        },
        version: RdfVersion.V2
      });
    }
  };

  return (
    <SC.ValidatorPage>
      <SC.Title>Valideringsverktøy</SC.Title>
      <ValidationInputForm isLoading={isLoading} onValidate={onValidate} />
      <SC.ValidationResult>
        {isValidating ? <div>VALIDATING...</div> : ''}
        {errorOccured ? <div>OOPS SOMETHING WENT WRONG!</div> : ''}
        {validationReport ? (
          <div>RDF IS {validationReport.conforms ? 'VALID' : 'NOT VALID'}</div>
        ) : (
          ''
        )}
      </SC.ValidationResult>
    </SC.ValidatorPage>
  );
};

export default compose<FC>(memo, withValidator)(ValidatorPage);
