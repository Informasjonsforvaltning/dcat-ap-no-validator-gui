/* eslint-disable no-console */
import axios from 'axios';
import env from '../../env';
import { ApiError, HttpError } from '../../utils/commons';

interface Props {
  path: string;
  method: any;
  headers?: any;
  data?: any;
}

const { VALIDATOR_API_HOST } = env;

export const validatorApi = ({ path, method, headers, data }: Props) =>
  axios({
    url: `${VALIDATOR_API_HOST}${path}`,
    method,
    headers,
    data
  }).catch(error => {
    if (error.response) {
      const { status, data: errorData } = error.response;
      throw new HttpError(status, errorData.detail);
    }

    throw new ApiError('API call failed');
  });

export const validatorApiPost = (path: string, body: any) =>
  validatorApi({ path, method: 'POST', data: body });

export const validatorApiGet = (path: string) =>
  validatorApi({ path, method: 'GET' });
