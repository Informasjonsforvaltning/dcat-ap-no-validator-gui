import {
  VALIDATE_RDF_REQUESTED,
  VALIDATE_RDF_SUCCEEDED,
  VALIDATE_RDF_FAILED
} from './action-types';

import type { ValidationReport, ValidationRequest } from '../../../types';

export function validateRdfRequested(request: ValidationRequest) {
  return {
    type: VALIDATE_RDF_REQUESTED,
    payload: {
      request
    }
  };
}

export function validateRdfSucceeded(validationReport: ValidationReport) {
  return {
    type: VALIDATE_RDF_SUCCEEDED,
    payload: {
      validationReport
    }
  };
}

export function validateRdfFailed(message: string) {
  return {
    type: VALIDATE_RDF_FAILED,
    payload: {
      message
    }
  };
}
