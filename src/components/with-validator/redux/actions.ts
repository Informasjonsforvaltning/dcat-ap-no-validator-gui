import { ValidationReport } from '../../../types';
import {
  VALIDATE_RDF_REQUESTED,
  VALIDATE_RDF_SUCCEEDED,
  VALIDATE_RDF_FAILED
} from './action-types';

export function validateRdfRequested() {
  return {
    type: VALIDATE_RDF_REQUESTED
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
