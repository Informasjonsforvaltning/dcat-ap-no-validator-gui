import { AxiosError } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { VALIDATE_RDF_REQUESTED } from './action-types';
import * as actions from './actions';

import { mapToValidationReport, validateRdf } from './api';

function* validateRdfRequested({
  payload: { request }
}: ReturnType<typeof actions.validateRdfRequested>) {
  try {
    const result = yield call(validateRdf, request);
    // If error
    if (result instanceof Error) {
      const error = <AxiosError>result;
      if (error.response) {
        if (error.code === '500') {
          yield put(
            actions.validateRdfFailed(
              'Oops, something went wrong. Try again later.'
            )
          );
        } else {
          yield put(actions.validateRdfFailed(error.response?.data.detail));
        }
      } else {
        yield put(actions.validateRdfFailed(error.message));
      }
    } else if (result) {
      yield put(
        actions.validateRdfSucceeded(mapToValidationReport(result.data))
      );
    }
  } catch (e) {
    yield put(actions.validateRdfFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(VALIDATE_RDF_REQUESTED, validateRdfRequested)]);
}
