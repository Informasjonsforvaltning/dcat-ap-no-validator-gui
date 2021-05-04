import { fromJS } from 'immutable';

import * as actions from './actions';
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

import type { Actions } from '../../../types';

const initialState = fromJS({
  validationRequest: null,
  validationReport: null,
  validationError: null,
  isValidating: false
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case VALIDATE_DATA_GRAPH_REQUESTED:
      return state
        .set('validationReport', null)
        .set('validationError', null)
        .set('isValidating', true);
    case VALIDATE_DATA_GRAPH_SUCCEEDED:
      return state
        .set('validationReport', fromJS(action.payload.validationReport))
        .set('validationError', null)
        .set('isValidating', false);
    case VALIDATE_DATA_GRAPH_FAILED:
      return state
        .set('validationReport', null)
        .set('validationError', fromJS(action.payload))
        .set('isValidating', false);
    case FETCH_SHAPES_REQUESTED:
      return state
        .set('shapes', null)
        .set('shapesError', null)
        .set('isFetchingShapes', true);
    case FETCH_SHAPES_SUCCEEDED:
      return state
        .set('shapes', fromJS(action.payload.shapes))
        .set('shapesError', null)
        .set('isFetchingShapes', false);
    case FETCH_SHAPES_FAILED:
      return state
        .set('shapes', null)
        .set('shapesError', fromJS(action.payload))
        .set('isFetchingShapes', false);
    case FETCH_ONTOLOGIES_REQUESTED:
      return state
        .set('ontologies', null)
        .set('ontologiesError', null)
        .set('isFetchingOntologies', true);
    case FETCH_ONTOLOGIES_SUCCEEDED:
      return state
        .set('ontologies', fromJS(action.payload.ontologies))
        .set('ontologiesError', null)
        .set('isFetchingOntologies', false);
    case FETCH_ONTOLOGIES_FAILED:
      return state
        .set('ontologies', null)
        .set('ontologiesError', fromJS(action.payload))
        .set('isFetchingOntologies', false);
    default:
      return state;
  }
}
