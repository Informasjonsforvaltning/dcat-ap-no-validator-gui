import axios from 'axios';
import env from '../../env';

interface Props {
  path: string;
  method: any;
  headers?: any;
  data?: any;
}

const { VALIDATOR_API_HOST } = env;

const mapMultipartMixedResponse = () => ({});

export const validatorApi = ({ path, method, headers, data }: Props) =>
  axios({
    url: `${VALIDATOR_API_HOST}${path}`,
    method,
    headers,
    data
  })
    .then(response => response.data)
    .catch(() => null);

export const validatorApiPost = (path: string, body: any) =>
  validatorApi({ path, method: 'POST', data: body });

export const validatorApiMultipartPost = (path: string, body: FormData) =>
  validatorApi({
    path,
    method: 'POST',
    headers: {
      Accept: 'multipart/mixed',
      'Content-Type': 'multipart/form-data'
    },
    data: body
  });

export const validatorApiGet = (path: string) =>
  validatorApi({ path, method: 'GET' });
