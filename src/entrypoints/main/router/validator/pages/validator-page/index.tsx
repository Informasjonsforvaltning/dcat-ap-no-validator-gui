import React, { memo, FC, useEffect } from 'react';
import { compose } from 'redux';
import { Severity } from '@fellesdatakatalog/alert';

import withValidator, {
  Props as ValidatorProps
} from '../../../../../../components/with-validator';

import SC from './styled';

import type { ValidationRequest } from '../../../../../../types';
import { useQuery } from '../../../../../../utils/commons';
import { Ontology } from '../../../../../../types/enums';

interface Props extends ValidatorProps {}

const ValidatorPage: FC<Props> = ({
  validationReport,
  validationError,
  isValidating,
  validatorActions: { validateDataGraphRequested: validateDataGraph }
}) => {
  const query = useQuery();
  const dataGraph = decodeURIComponent(query.get('data') ?? '');
  const shapesGraph = decodeURIComponent(query.get('shapes') ?? '');
  const ontologyGraph = decodeURIComponent(
    query.get('ontology') ?? Ontology.DEFAULT
  );

  const onValidate = (request: ValidationRequest) => validateDataGraph(request);

  useEffect(() => {
    if (query.has('data') && query.has('shapes')) {
      onValidate({
        dataGraph,
        shapesGraph,
        ontologyGraph,
        config: { expand: true, includeExpandedTriples: false }
      });
    }
  }, []);

  return (
    <SC.ValidatorPage>
      <SC.Title>DCAT-AP-NO valideringsverktøy</SC.Title>
      <SC.ValidationForm
        dataGraph={dataGraph}
        shapesGraph={shapesGraph}
        ontologyGraph={ontologyGraph}
        expand
        includeExpandedTriples={false}
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
