import { fromJS } from 'immutable';

import * as actions from './actions';
import { VALIDATE_RDF_REQUESTED, VALIDATE_RDF_SUCCEEDED } from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  entities: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case VALIDATE_RDF_REQUESTED:
      return state.set('validationReport', fromJS(undefined));
    case VALIDATE_RDF_SUCCEEDED:
      return state.set(
        'validationReport',
        fromJS(action.payload.validationReport)
      );
    default:
      return state;
  }
}
