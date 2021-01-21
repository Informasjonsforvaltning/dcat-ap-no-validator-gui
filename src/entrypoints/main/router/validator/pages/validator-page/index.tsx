import React, { memo, FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import Alert, { Severity } from '@fellesdatakatalog/alert';

import withValidator, {
  Props as ValidatorProps
} from '../../../../../../components/with-validator';

import ValidationInputForm from '../../../../../../components/validation-input-form';
import ValidationReport from '../../../../../../components/validation-report';

import SC from './styled';

import type { ValidationRequest } from '../../../../../../types';
import { DcatVersion } from '../../../../../../types/enums';

interface Props extends ValidatorProps {}

interface RouteParams {
  resource: string;
}

const ValidatorPage: FC<Props> = ({
  validationReport,
  validationError,
  isValidating,
  validatorActions: { validateRdfRequested: validateRdf }
}) => {
  const { resource } = useParams<RouteParams>();

  const url = resource ? decodeURIComponent(resource) : '';

  const onValidate = (request: ValidationRequest) => validateRdf(request);

  useEffect(() => {
    if (url && url.length > 0) {
      onValidate({ resource: url, version: DcatVersion.V2 });
    }
  }, []);

  return (
    <SC.ValidatorPage>
      <SC.Title>Valideringsverktøy</SC.Title>
      <ValidationInputForm
        url={url}
        isLoading={isValidating}
        onValidate={onValidate}
      />
      {validationError && (
        <Alert severity={Severity.ERROR}>{validationError.message}</Alert>
      )}
      {validationReport && <ValidationReport report={validationReport} />}
    </SC.ValidatorPage>
  );
};

export default compose<FC>(memo, withValidator)(ValidatorPage);
