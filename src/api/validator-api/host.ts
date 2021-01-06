import axios from 'axios';
import env from '../../env';

interface Props {
  path: string;
  method: any;
  data?: any;
}

const { VALIDATOR_API_HOST } = env;

export const validatorApi = ({ path, method, data }: Props) =>
  
axios({
    url: `${VALIDATOR_API_HOST}${path}`,
    method,
    data
  })
    .then(response => response.data)
    .catch(() => null);

export const validatorApiPost = (path: string, body: any) =>
  validatorApi({ path, method: 'POST', data: body });

export const validatorApiGet = (path: string) =>
  validatorApi({ path, method: 'GET' });
