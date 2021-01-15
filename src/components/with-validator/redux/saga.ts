import { all, call, put, takeLatest } from 'redux-saga/effects';

import { VALIDATE_RDF_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  mapToValidationReport,
  validateRdf
} from '../../../api/validator-api/validator';

function* validateRdfRequested({
  payload: { request }
}: ReturnType<typeof actions.validateRdfRequested>) {
  try {
    const result = yield call(validateRdf, request);
    if (result) {
      // if (res) {
      //   // eslint-disable-next-line no-console
      //   console.log(res.status);
      //   if (res.status === 200) {
      //     return mapToValidationReport(res.data);
      //   }
      //   if (res.status === 400) {
      //     throw InvalidRequestException(res.data.detail);
      //   }
      //   if (res.status === 415) {
      //     throw UnsupportedContentTypeException(res.data.detail);
      //   }
      //   if (res.status === 500) {
      //     throw InternalServerException(res.data.detail);
      //   }
      // }
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(result));
      yield put(
        actions.validateRdfSucceeded(mapToValidationReport(result.data))
      );
    } else {
      yield put(
        actions.validateRdfFailed('UnknownException', 'No validation report')
      );
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('validate failed', e);
    yield put(actions.validateRdfFailed(e.name, e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(VALIDATE_RDF_REQUESTED, validateRdfRequested)]);
}
