import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  VALIDATE_RDF_FAILED,
  VALIDATE_RDF_REQUESTED,
  VALIDATE_RDF_SUCCEEDED
} from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  validationReport: null,
  isValidating: false
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case VALIDATE_RDF_REQUESTED:
      return state
        .set('validationReport', fromJS(null))
        .set('isValidating', true)
        .set('errorOccured', false);
    case VALIDATE_RDF_SUCCEEDED:
      return state
        .set('validationReport', fromJS(action.payload.validationReport))
        .set('isValidating', false)
        .set('errorOccured', false);
    case VALIDATE_RDF_FAILED:
      return state
        .set('validationReport', fromJS(null))
        .set('isValidating', false)
        .set('errorOccured', true);
    default:
      return state;
  }
}
