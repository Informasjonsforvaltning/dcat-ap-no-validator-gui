import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  VALIDATE_DATA_GRAPH_REQUESTED,
  VALIDATE_DATA_GRAPH_SUCCEEDED,
  VALIDATE_DATA_GRAPH_FAILED,
  FETCH_SHAPES_COLLECTION_REQUESTED,
  FETCH_SHAPES_COLLECTION_SUCCEEDED,
  FETCH_SHAPES_COLLECTION_FAILED
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
    case FETCH_SHAPES_COLLECTION_REQUESTED:
      return state
        .set('shapesCollection', null)
        .set('shapesError', null)
        .set('isFetchingShapes', true);
    case FETCH_SHAPES_COLLECTION_SUCCEEDED:
      return state
        .set('shapesCollection', fromJS(action.payload.shapesCollection))
        .set('shapesError', null)
        .set('isFetchingShapes', false);
    case FETCH_SHAPES_COLLECTION_FAILED:
      return state
        .set('shapesCollection', null)
        .set('shapesError', fromJS(action.payload))
        .set('isFetchingShapes', false);
    default:
      return state;
  }
}
