import axios from 'axios';
import cleanDeep from 'clean-deep';
import { getConfig } from '../../config';

interface Props {
  path: string;
  method: any;
  data?: any;
}

export const validatorApi = ({ path, method, data }: Props) =>
  axios({
    url: `${getConfig().validateApi.host}${path}`,
    method,
    data
  })
    .then(response => cleanDeep(response.data))
    .catch(() => null);

export const validatorApiPost = (path: string, body: any) =>
  validatorApi({ path, method: 'POST', data: body });

export const validatorApiGet = (path: string, body: any) =>
  validatorApi({ path, method: 'GET' });
