import React, { memo, FC, Fragment } from 'react';
import { compose } from 'redux';
import Link from '@fellesdatakatalog/link';

import Translation from '../translation';

import SC from './styled';

import {
  isError,
  isWarning,
  isTip,
  groupValidationResults,
  getEntityTypes
} from './utils';

import type { ValidationReport as ValidationReportType } from '../../types';

interface ExternalProps {
  report: ValidationReportType;
}

interface Props extends ExternalProps {}

const ValidationReport: FC<Props> = ({
  report: { conforms, results = [] },
  ...props
}) => {
  const errors = results.filter(isError);
  const warnings = results.filter(isWarning);
  const tips = results.filter(isTip);

  const groupedErrors = groupValidationResults(errors, 'Andre feil');
  const groupedWarnings = groupValidationResults(warnings, 'Andre advarsler');
  const groupedTips = groupValidationResults(tips, 'Andre tips');

  return (
    <SC.ValidationReport {...props}>
      <SC.ValidationSummary>
        {conforms ? (
          <SC.ConformsSummary>
            <SC.SuccessIcon />
            <Translation id='Data samsvarer spesifikasjonen!' />
          </SC.ConformsSummary>
        ) : (
          <>
            <SC.ErrorsSummary>
              <SC.ErrorIcon />
              <Translation id={`${errors.length} feil`} />
            </SC.ErrorsSummary>
            <SC.WarningsSummary>
              <SC.WarningIcon />
              <Translation id={`${warnings.length} advarsler`} />
            </SC.WarningsSummary>
            <SC.TipsSummary>
              <SC.InfoIcon />
              <Translation id={`${tips.length} tips`} />
            </SC.TipsSummary>
          </>
        )}
      </SC.ValidationSummary>
      {groupedErrors.length > 0 && (
        <SC.ValidationErrors>
          <h3>
            <SC.ErrorIcon />
            <Translation id={`Feil (${errors.length})`} />
          </h3>
          {groupedErrors.map(([uri, values]) => (
            <SC.ValidationError key={uri}>
              <h4>{uri}</h4>
              {getEntityTypes(values).length > 0 && (
                <p>
                  <Translation
                    id={`Type: ${getEntityTypes(values).join(', ')}`}
                  />
                </p>
              )}
              {Object.entries(values).map(([path, entries]) => (
                <Fragment key={`${uri}-${path}`}>
                  <h6>
                    <Link href={path} external>
                      {path}
                    </Link>
                  </h6>
                  {entries.map(({ resultMessage, value }, index) => (
                    <p key={`${resultMessage}-${index}`}>
                      {resultMessage}
                      {value && (
                        <>
                          : <strong>{value}</strong>
                        </>
                      )}
                    </p>
                  ))}
                </Fragment>
              ))}
            </SC.ValidationError>
          ))}
        </SC.ValidationErrors>
      )}
      {groupedWarnings.length > 0 && (
        <SC.ValidationWarnings>
          <h3>
            <SC.WarningIcon />
            <Translation id={`Advarsler (${warnings.length})`} />
          </h3>
          {groupedWarnings.map(([uri, values]) => (
            <SC.ValidationWarning key={uri}>
              <h4>{uri}</h4>
              {getEntityTypes(values).length > 0 && (
                <p>
                  <Translation
                    id={`Type: ${getEntityTypes(values).join(', ')}`}
                  />
                </p>
              )}
              {Object.entries(values).map(([path, entries]) => (
                <Fragment key={`${uri}-${path}`}>
                  <h6>
                    <Link href={path} external>
                      {path}
                    </Link>
                  </h6>
                  {entries.map(({ resultMessage, value }, index) => (
                    <p key={`${resultMessage}-${index}`}>
                      {resultMessage}
                      {value && (
                        <>
                          : <strong>{value}</strong>
                        </>
                      )}
                    </p>
                  ))}
                </Fragment>
              ))}
            </SC.ValidationWarning>
          ))}
        </SC.ValidationWarnings>
      )}
      {groupedTips.length > 0 && (
        <SC.ValidationTips>
          <h3>
            <SC.InfoIcon />
            <Translation id={`Tips (${tips.length})`} />
          </h3>
          {groupedTips.map(([uri, values]) => (
            <SC.ValidationTip key={uri}>
              <h4>{uri}</h4>
              {getEntityTypes(values).length > 0 && (
                <p>
                  <Translation
                    id={`Type: ${getEntityTypes(values).join(', ')}`}
                  />
                </p>
              )}
              {Object.entries(values).map(([path, entries]) => (
                <Fragment key={`${uri}-${path}`}>
                  <h6>
                    <Link href={path} external>
                      {path}
                    </Link>
                  </h6>
                  {entries.map(({ resultMessage, value }, index) => (
                    <p key={`${resultMessage}-${index}`}>
                      {resultMessage}
                      {value && (
                        <>
                          : <strong>{value}</strong>
                        </>
                      )}
                    </p>
                  ))}
                </Fragment>
              ))}
            </SC.ValidationTip>
          ))}
        </SC.ValidationTips>
      )}
    </SC.ValidationReport>
  );
};

export default compose<FC<ExternalProps>>(memo)(ValidationReport);
