import React, { memo, FC } from 'react';
import { compose } from 'redux';
import Alert, { Severity } from '@fellesdatakatalog/alert';
import ValidationInputForm from '../../../../../../components/validation-input-form';

import { DcatVersion } from '../../../../../../types/enums';
import withValidator, {
  Props as ValidatorProps
} from '../../../../../../components/with-validator';

import SC from './styled';

interface Props extends ValidatorProps {}

const ValidatorPage: FC<Props> = ({
  validationReport,
  validationError,
  isValidating,
  validatorActions: { validateRdfRequested: validateRdf }
}) => {
  const onValidate = (inputFile: File | string) => {
    validateRdf({
      resource: inputFile,
      version: DcatVersion.V2
    });
  };

  return (
    <SC.ValidatorPage>
      <SC.Title>Valideringsverktøy</SC.Title>
      <ValidationInputForm isLoading={isValidating} onValidate={onValidate} />
      <SC.ValidationResult>
        {validationError && <Alert severity={Severity.ERROR}>{validationError.message}</Alert>}
        {validationReport ? (
          <div>
            RDF resource is{' '}
            <strong>{validationReport.conforms ? 'valid' : 'not valid'}</strong>
          </div>
        ) : (
          ''
        )}
      </SC.ValidationResult>
    </SC.ValidatorPage>
  );
};

export default compose<FC>(memo, withValidator)(ValidatorPage);
