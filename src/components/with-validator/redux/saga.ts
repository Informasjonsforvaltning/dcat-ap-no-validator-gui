/* eslint-disable no-console */

import { all, call, put, takeLatest } from 'redux-saga/effects';

import { VALIDATE_RDF_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  mapToValidationReport,
  validateRdf
} from '../../../api/validator-api/validator';
import { ApiError, HttpError } from '../../../utils/commons';

function* validateRdfRequested({
  payload: { request }
}: ReturnType<typeof actions.validateRdfRequested>) {
  try {
    const result = yield call(validateRdf, request);
    if (result) {
      yield put(
        actions.validateRdfSucceeded(mapToValidationReport(result.data))
      );
    } else {
      yield put(actions.validateRdfFailed('Validation report is undefined.'));
    }
  } catch (e) {
    if (e instanceof HttpError) {
      if (e.code === 400 || e.code === 415) {
        yield put(actions.validateRdfFailed(e.message));
      } else if (e.code === 500) {
        yield put(
          actions.validateRdfFailed(
            'Oops, something went wrong. Try again later.'
          )
        );
      }
    } else if (e instanceof ApiError) {
      yield put(actions.validateRdfFailed(e.message));
    }
  }
}

export default function* saga() {
  yield all([takeLatest(VALIDATE_RDF_REQUESTED, validateRdfRequested)]);
}
