import {
  VALIDATE_DATA_GRAPH_REQUESTED,
  VALIDATE_DATA_GRAPH_SUCCEEDED,
  VALIDATE_DATA_GRAPH_FAILED,
  FETCH_SHAPES_REQUESTED,
  FETCH_SHAPES_SUCCEEDED,
  FETCH_SHAPES_FAILED,
  FETCH_ONTOLOGIES_REQUESTED,
  FETCH_ONTOLOGIES_SUCCEEDED,
  FETCH_ONTOLOGIES_FAILED
} from './action-types';

import type {
  Definition,
  ValidationReport,
  ValidationRequest
} from '../../../types';

export function validateDataGraphRequested(request: ValidationRequest) {
  return {
    type: VALIDATE_DATA_GRAPH_REQUESTED,
    payload: {
      request
    }
  };
}

export function validateDataGraphSucceeded(validationReport: ValidationReport) {
  return {
    type: VALIDATE_DATA_GRAPH_SUCCEEDED,
    payload: {
      validationReport
    }
  };
}

export function validateDataGraphFailed(message: string) {
  return {
    type: VALIDATE_DATA_GRAPH_FAILED,
    payload: {
      message
    }
  };
}

export function fetchShapesRequested() {
  return {
    type: FETCH_SHAPES_REQUESTED
  };
}

export function fetchShapesSucceeded(shapes: Definition[]) {
  return {
    type: FETCH_SHAPES_SUCCEEDED,
    payload: {
      shapes
    }
  };
}

export function fetchShapesFailed(message: string) {
  return {
    type: FETCH_SHAPES_FAILED,
    payload: {
      message
    }
  };
}

export function fetchOntologiesRequested() {
  return {
    type: FETCH_ONTOLOGIES_REQUESTED
  };
}

export function fetchOntologiesSucceeded(ontologies: Definition[]) {
  return {
    type: FETCH_ONTOLOGIES_SUCCEEDED,
    payload: {
      ontologies
    }
  };
}

export function fetchOntologiesFailed(message: string) {
  return {
    type: FETCH_ONTOLOGIES_FAILED,
    payload: {
      message
    }
  };
}
