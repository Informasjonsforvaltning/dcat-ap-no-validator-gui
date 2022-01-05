import axios, { AxiosError } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import env from '../../../env';

import {
  FETCH_SHAPES_REQUESTED,
  FETCH_ONTOLOGIES_REQUESTED,
  VALIDATE_DATA_GRAPH_REQUESTED
} from './action-types';
import * as actions from './actions';

import { isValidUrl, createFormData, createValidationReport } from './utils';

const { VALIDATOR_API_HOST } = env;

function* validateDataGraphRequested({
  payload: { request }
}: ReturnType<typeof actions.validateDataGraphRequested>) {
  const { dataGraph, shapesGraph } = request;

  if (typeof dataGraph === 'string' && !isValidUrl(dataGraph)) {
    yield put(
      actions.validateDataGraphFailed(
        'Oppgitt valider lenke er ikke en gyldig URL.'
      )
    );
    return;
  }

  if (typeof shapesGraph === 'string' && !isValidUrl(shapesGraph)) {
    yield put(
      actions.validateDataGraphFailed(
        'Oppgitt regelsett lenke er ikke en gyldig URL.'
      )
    );
    return;
  }

  try {
    const formData: FormData = yield call(createFormData, request);

    const { data } = yield call(
      axios.post,
      `${VALIDATOR_API_HOST}/validator`,
      formData,
      {
        headers: {
          Accept: 'text/turtle'
        }
      }
    );

    if (data) {
      yield put(
        actions.validateDataGraphSucceeded(createValidationReport(data))
      );
    } else {
      yield put(
        actions.validateDataGraphFailed(
          'Noe gikk galt. Vennligst prøv igjen senere.'
        )
      );
    }
  } catch (e: any) {
    if (e.isAxiosError) {
      const { message, response } = e as AxiosError;

      if (response?.status === 500) {
        yield put(
          actions.validateDataGraphFailed(
            'Noe gikk galt. Vennligst prøv igjen senere.'
          )
        );
      } else {
        yield put(
          actions.validateDataGraphFailed(response?.data.detail ?? message)
        );
      }
    } else {
      // Log error to console
      // eslint-disable-next-line no-console
      console.log(e);
      yield put(
        actions.validateDataGraphFailed(
          'Beklager, men vi klarer ikke parse resultatet. Ta kontakt eller vennligst prøv igjen senere.'
        )
      );
    }
  }
}

function* fetchShapesRequested() {
  try {
    const { data } = yield call(axios.get, `${VALIDATOR_API_HOST}/shapes`, {
      headers: {
        Accept: 'application/json'
      }
    });

    if (data) {
      const { shapes } = data;
      yield put(actions.fetchShapesSucceeded(shapes));
    } else {
      yield put(
        actions.fetchShapesFailed(
          'Feil ved henting av regelsett. Vennligst prøv igjen senere.'
        )
      );
    }
  } catch (e) {
    const { message, response } = e as AxiosError;

    if (response?.status === 500) {
      yield put(
        actions.fetchShapesFailed(
          'Feil ved henting av regelsett. Vennligst prøv igjen senere.'
        )
      );
    } else {
      yield put(actions.fetchShapesFailed(response?.data.detail ?? message));
    }
  }
}

function* fetchOntologiesRequested() {
  try {
    const { data } = yield call(axios.get, `${VALIDATOR_API_HOST}/ontologies`, {
      headers: {
        Accept: 'application/json'
      }
    });

    if (Array.isArray(data.ontologies)) {
      yield put(actions.fetchOntologiesSucceeded(data.ontologies));
    } else {
      yield put(
        actions.fetchOntologiesFailed(
          'Feil ved henting av ontologi. Vennligst prøv igjen senere.'
        )
      );
    }
  } catch (e) {
    const { message, response } = e as AxiosError;

    if (response?.status === 500) {
      yield put(
        actions.fetchOntologiesFailed(
          'Feil ved henting av ontologi. Vennligst prøv igjen senere.'
        )
      );
    } else {
      yield put(
        actions.fetchOntologiesFailed(response?.data.detail ?? message)
      );
    }
  }
}

export default function* saga() {
  yield all([
    takeLatest(VALIDATE_DATA_GRAPH_REQUESTED, validateDataGraphRequested),
    takeLatest(FETCH_SHAPES_REQUESTED, fetchShapesRequested),
    takeLatest(FETCH_ONTOLOGIES_REQUESTED, fetchOntologiesRequested)
  ]);
}
