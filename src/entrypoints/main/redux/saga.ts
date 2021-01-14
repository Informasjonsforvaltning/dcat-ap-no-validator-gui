import { all } from 'redux-saga/effects';
import validatorSaga from '../../../components/with-validator/redux/saga';

export default function* saga() {
  yield all([validatorSaga()]);
}
