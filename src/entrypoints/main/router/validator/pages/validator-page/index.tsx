import React, { memo, FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { Severity } from '@fellesdatakatalog/alert';

import withValidator, {
  Props as ValidatorProps
} from '../../../../../../components/with-validator';

import SC from './styled';

import type { ValidationRequest } from '../../../../../../types';

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
      onValidate({
        resource: url,
        config: { expand: true, includeExpandedTriples: false }
      });
    }
  }, []);

  return (
    <SC.ValidatorPage>
      <SC.Title>Valideringsverktøy</SC.Title>
      <SC.ValidationInputForm
        url={url}
        isLoading={isValidating}
        onValidate={onValidate}
      />
      {validationError && (
        <SC.Alert severity={Severity.ERROR}>{validationError.message}</SC.Alert>
      )}
      {validationReport && <SC.ValidationReport report={validationReport} />}
    </SC.ValidatorPage>
  );
};

export default compose<FC>(memo, withValidator)(ValidatorPage);
