import axios, { AxiosError } from 'axios';
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
    yield put(actions.validateRdfFailed('Oppgitt URL har ikke gyldig format.'));
    return;
  }

  try {
    const { data } = yield call(
      axios.post,
      `${VALIDATOR_API_HOST}/validator`,
      yield call(createFormData, request),
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
    const { message, response } = e as AxiosError;

    if (response?.status === 500) {
      yield put(
        actions.validateRdfFailed('Noe gikk galt. Vennligst prøv igjen senere.')
      );
    } else {
      yield put(actions.validateRdfFailed(response?.data.detail ?? message));
    }
  }
}

export default function* saga() {
  yield all([takeLatest(VALIDATE_RDF_REQUESTED, validateRdfRequested)]);
}
