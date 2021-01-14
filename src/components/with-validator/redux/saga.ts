import { all, call, put, takeLatest } from 'redux-saga/effects';

import { VALIDATE_RDF_REQUESTED } from './action-types';
import * as actions from './actions';

import { validateRdf } from '../../../api/validator-api/validator';

function* validateRdfRequested({
  payload: { request }
}: ReturnType<typeof actions.validateRdfRequested>) {
  try {
    const validationReport = yield call(validateRdf, request);
    if (validationReport) {
      yield put(actions.validateRdfSucceeded(validationReport));
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
