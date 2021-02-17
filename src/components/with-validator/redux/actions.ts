import {
  VALIDATE_DATA_GRAPH_REQUESTED,
  VALIDATE_DATA_GRAPH_SUCCEEDED,
  VALIDATE_DATA_GRAPH_FAILED,
  FETCH_SHAPES_COLLECTION_REQUESTED,
  FETCH_SHAPES_COLLECTION_SUCCEEDED,
  FETCH_SHAPES_COLLECTION_FAILED
} from './action-types';

import type {
  ShapesCollection,
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

export function fetchShapesCollectionRequested() {
  return {
    type: FETCH_SHAPES_COLLECTION_REQUESTED
  };
}

export function fetchShapesCollectionSucceeded(
  shapesCollection: ShapesCollection
) {
  return {
    type: FETCH_SHAPES_COLLECTION_SUCCEEDED,
    payload: {
      shapesCollection
    }
  };
}

export function fetchShapesCollectionFailed(message: string) {
  return {
    type: FETCH_SHAPES_COLLECTION_FAILED,
    payload: {
      message
    }
  };
}
