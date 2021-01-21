import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import env from '../../../env';

import { VALIDATE_RDF_REQUESTED } from './action-types';
import * as actions from './actions';

import { isValidUrl, createFormData, createValidationReport } from './utils';

const { VALIDATOR_API_HOST } = env;

function* validateRdfRequested({
  payload: { request }
}: ReturnType<typeof actions.validateRdfRequested>) {
  const { resource } = request;

  if (typeof resource === 'string' && !isValidUrl(resource)) {
    yield put(actions.validateRdfFailed('Url to validate is not valid'));
    return;
  }

  try {
    const { data } = yield call(
      axios.post,
      `${VALIDATOR_API_HOST}/validator`,
      createFormData(request),
      {
        headers: {
          Accept: 'text/turtle'
        }
      }
    );

    if (data) {
      yield put(actions.validateRdfSucceeded(createValidationReport(data)));
    } else {
      yield put(actions.validateRdfFailed(''));
    }
  } catch (e) {
    yield put(actions.validateRdfFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(VALIDATE_RDF_REQUESTED, validateRdfRequested)]);
}
